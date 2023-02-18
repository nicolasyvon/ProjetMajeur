export class Game {

  roomName:string;
  players:Map<string,Object>;
  gameMode:Object;
  gameState:Object|null;
  listThieves:string[];

  constructor(roomName, players, gameMode) {
    this.roomName = roomName;
    this.players = players; //Map  id joueur et team:
    this.gameMode = gameMode;
    this.gameState = null;  // {time:,score:,scoreToAchieve:,listThievesArrested:,isGameFinished:,winner:}    
    this.listThieves = []
  }

  public setListThieves(){
    this.players.forEach((keys, values) => {
      if (values !== "police") this.listThieves.push(values.toString());
    });
  }

  public getListThieves(){
    return this.listThieves;
  }

  public setGameState(newGameState){
    this.gameState=newGameState;
  }

  public getGameState(){
    return(this.gameState);
  }
  public setPlayers(newPlayersMap:Map<string,Object>){
    this.players=newPlayersMap;
  }

  public getPlayers():Map<string,Object>{
    return(this.players);
  }


}
