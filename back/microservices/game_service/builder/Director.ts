import Builder from "./Builder";
import HoldUpBuilder from "./ConcreteBuilders/HoldUpBuilder.js";
import CatMouseBuilder from "./ConcreteBuilders/CatMouseBuilder.js";
import GameMode from "./GameMode";
import GameModeInterface from "./GameModeInterface";

class Director {
  private builder: Builder;

  constructor() {
    //this.builder=building;
  }

  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  private chooseBuilder(options): void {
    switch (options.gameMode) {
      case "HoldUpBuilder":
        this.builder = new HoldUpBuilder();
        break;
      case "CatMouseBuilder":
        this.builder = new CatMouseBuilder();
        break;
    }
  }

  public make(options): GameModeInterface {
    this.chooseBuilder(options);
    this.builder.buildVictory();
    this.builder.buildTeamPercentage();
    this.builder.buildMap();
    return this.builder.getGameMode();
  }
}

export default Director;
