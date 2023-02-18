import Phaser from "phaser";
import Voleur from "../game_element/agent/living/Voleur.ts";
import EventDispatcher from "../network/EventDispatcher.js";
import Policier from "../game_element/agent/living/Policier.ts";
import Chest from "../game_element/agent/interactive_object/Chest.ts";
import Player_creator from "../creator/player_creator.ts";
import InteractionMediator from "../interaction/mediator/InteractionMediator.ts";
import Creator from "../creator/creator.ts";
import Building from "../game_element/agent/inert/area/Building.ts";
import test from "./TestBuilding";

class MainScene extends Phaser.Scene {
  constructor() {
    super("main_scene");
    this.building = new Building(this);
    this.players = null;
    this.frameTime = 0;
    this.emitter = null;
    this.currentPlayer = null;
    this.NeedEmit = false;
    this.mediator = new InteractionMediator(this);
    this.creator = new Creator(this, this.mediator);
  }

  preload() {
    Chest.preload(this);
    this.load.plugin(
      "rexoutlinepipelineplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexoutlinepipelineplugin.min.js",
      true
    );
    Voleur.preload(this);
    Policier.preload(this);
    this.load.image("charac", "assets/images.png");
  }

  create() {
    // const screenCenterX =
    //   this.cameras.main.worldView.x + this.cameras.main.width / 2 - 300;
    // const screenCenterY =
    //   this.cameras.main.worldView.y + this.cameras.main.height / 2 + 250;
    // const timer = this.add
    //   .text(screenCenterX, screenCenterY, `Timer \n 300`, {
    //     fill: "#000000",
    //     fontSize: "25px",
    //     fontStyle: "bold",
    //   })
    //   .setOrigin(0.5);
    // timer.setScrollFactor(0);
    // timer.fixedToCamera = true;

    // const scoreText = this.add.text(0, 0, "Hello World", {
    //   fontFamily: '"Roboto Condensed"',
    //   fontSize: "px",
    // });
    // scoreText.scrollFactorX = 0;
    // scoreText.scrollFactorY = 0;
    // scoreText.setFontSize(60);

    // timer.cameraOffset.setTo(100, 100);

    /*
        this.chest.create();
        this.currentPlayer.create();
        this.interactive_agents.push(this.chest);
        */

    //this.cameras.main.setBounds(0, 0, 1000, 800);

    let coord = this.cache.custom.mapCache.get("mapData");
    /*
    this.playersmap = new Map(this.cache.custom.playerCache.get("players"));
    let currentPlayer = this.cache.custom.playerCache.get("currentPlayer");
    [this.players,this.currentPlayer,this.interactive_agents] = Player_creator.createPlayers(playersmap,currentPlayer,this);

    */

    //this.cameras.main.setBounds(0, 0, 1000, 800);
    [this.players, this.currentPlayer] = this.creator.create();
    this.cameras.main.startFollow(this.currentPlayer.sprite);
    //this.cameras.main.followOffset.set(0, 0);

    //this.building.create(test());

    //this.wall.create(coord);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.emitter = EventDispatcher.getInstance();
    this.emitter.on("player_update", this.handler, this);
  }

  update(time, delta) {
    let action;
    this.frameTime += delta;
    let data = null;
    let emit = false;
    if (this.currentPlayer.blocked) {
    } 
    else {
      if (this.input.keyboard.checkDown(this.cursors.up)) {
        data = this.currentPlayer.goFoward();
        action = "move_up";
        emit = true;
      } else if (this.input.keyboard.checkDown(this.cursors.down)) {
        data = this.currentPlayer.goBehind();
        action = "move_down";
        emit = true;
      } else if (this.input.keyboard.checkDown(this.cursors.left)) {
        data = this.currentPlayer.goLeft();
        action = "move_left";
        emit = true;
      } else if (this.input.keyboard.checkDown(this.cursors.right)) {
        data = this.currentPlayer.goRight();
        action = "move_right";
        emit = true;
      } else {
        if (!this.currentPlayer.getIsIdle()) {
          emit = true;
        }
        data = this.currentPlayer.idle();
        action = "move_idle";
      }
      if (this.keyE.isDown) {
        let [receiverId, interactionResult] = this.currentPlayer.interact();
        if (receiverId != null) {
          action = "interact";
          data = {
            senderId: this.currentPlayer.getId(),
            receiverId: receiverId,
            interactionResult: interactionResult,
          };
          console.log(data)

          emit = true;
        }
      }
      if (emit && this.frameTime > 100) {
        this.frameTime = 0;
        this.emitter.emit("current_player_update", {
          action: action,
          data: data,
        });
      }
    }
  }

  handler(args) {
    let player = this.players.get(args.player);
    if (args.action.includes("move")) {
      player.setPosition(args.data.coord);
    }

    switch (args.action) {
      case "move_up":
        player.goFoward();
        break;
      case "move_down":
        player.goBehind();
        break;
      case "move_right":
        player.goRight();
        break;
      case "move_left":
        player.goLeft();
        break;
      case "move_idle":
        player.idle();
        break;

      case "interact":
        console.log(args.data)

        this.mediator.notify(args.data.senderId, args.data.receiverId);
        break;
    }
  }
}
export default MainScene;
