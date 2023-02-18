import axios from "axios";
import Director from "./builder/Director.ts";
import { Game } from "./model/Game.js";

export default class GameService {
  constructor() {
    this.games = [];
    this.director = new Director();
  }

  async createGame(body) {
    try {
      let gameMode = this.director.make(body.roomOptions);
      let players = new Map().set(body.host,{})
      let game = new Game(body.roomName, players, gameMode);
      this.games.push(game);

      body.roomOptions.percentage = gameMode.executeTeamPercentage();
      body.roomOptions.mapElements = gameMode.executeMap();

      axios
        .post(
          `http://mapgenerator-service:${process.env.MAPGENERATOR_DOCKER_PORT}/create`,
          body
        )

      axios
        .post(
          `http://match_handler-service:${process.env.MATCH_HANDLER_DOCKER_PORT}/create`,
          body
        )
        .then(() => {
          return game.roomName;
        })
        .catch((err) => {
          throw new Error(err);
        });

    } catch (error) {
      throw new Error(error);
    }
  }

  gameExist(roomName) {
    return this.games.find((r) => r.roomName == roomName) !== undefined;
  }
  // let game = this.games.find((r) => r.roomName == args.roomName);
  //indication au joueur si victoire...
  notify(args) {
    let index = this.games.findIndex((g) => g.roomName == args.roomName);

    if(!(args.action.includes("move"))){
      let gameState = this.games[index].getGameState();
      let listThieves = this.games[index].getListThieves();
  
      let data = this.games[index].gameMode.executeVictory({gameState:gameState,args:args,listThieves:listThieves});
      gameState = data["gameState"];
      

  
      this.games[index].setGameState(gameState);
  
  
  
      if (gameState["finish"] == true) {
        console.log("finish")

        this.notifyGame(
          this.games[index],
          "",
          {
            isGameFinished: true,
            winner: gameState["winner"],
          },
          "endGame"
        );
      }

    }

    this.notifyGame(
      this.games[index],
      args.player,
      {
        player: args.player,
        action: args.action,
        data: args.data,
      },
      "player_update"
    );
  }
//let game = this.games.find((g) => g.roomName == data.roomName);
  start(data) {
    let index = this.games.findIndex((g) => g.roomName == data.roomName);
    let players = new Map();
    data.players.forEach((key, index) => {
      players.set(key, data.team[index]);
    });
    this.games[index].setPlayers(players);

    let gameState={time:300,score:0,scoreToAchieve:1000,listThievesArrested:[],isGameFinished:false,winner:''};

    this.games[index].setListThieves();
    this.games[index].setGameState(gameState);


    // this.games.push(game);
    this.notifyGame(this.games[index], "", null, "gameStarted");
  }

  notifyGame(game, userName, data, event) {
    Array.from(game.players.keys()).forEach((user) => {
      if (user != userName) {
        let body = { event: event, data: data, dest: user };
        axios
          .post(
            `http://notification-service:${process.env.NOTIFICATION_DOCKER_PORT}/notifyUser`,
            body
          )
          .catch((err) => {
            throw new Error(err);
          });
      }
    });
  }


  //data : {roomName:roomName, map:map}
  setMap(data){
    let index = this.games.findIndex((r) => r.roomName == data.roomName);
    this.games[index].map = data.map;
    this.notifyGame(this.games[index], "", null, "mapLoaded")
  }

  getMap(roomName){
    return this.games.find((r) => r.roomName == roomName).map;
  }
}
