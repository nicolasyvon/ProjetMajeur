import TeamPercentageStrategyInterface from "../../strategy/TeamPercentage/TeamPercentageStrategyInterface";
import MapStrategyInterface from "../../strategy/Map/MapStrategyInterface";

import ConcreteGoalTime from "../../strategy/Goal/ConcreteGoalTimePolice.js";
import ConcreteTeamPercentageEqual from "../../strategy/TeamPercentage/ConcreteTeamPercentageEqual.js";
import ConcreteMapC0H10 from "../../strategy/Map/ConcreteMapC0H10.js";

import Builder from "../Builder";
import GameMode from "../GameMode.js";
import GameModeInterface from "../GameModeInterface";
import ConcreteVictoryCatMouse from "../../strategy/Victory/ConcreteVictoryCatMouse.js";
import VictoryStrategyInterface from "strategy/Victory/VictoryStrategyInterface";

export default class CatMouseBuilder implements Builder {
  private gameMode: GameModeInterface;

  victory: VictoryStrategyInterface;
  teamPercentage: TeamPercentageStrategyInterface;
  map: MapStrategyInterface;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.gameMode = new GameMode();
  }

  public buildVictory(): void {
    this.victory = new ConcreteVictoryCatMouse();
    this.gameMode.setVictoryStrategy(this.victory);
  }

  public buildTeamPercentage(): void {
    this.teamPercentage = new ConcreteTeamPercentageEqual();
    this.gameMode.setTeamPercentageStrategy(this.teamPercentage);
  }

  public buildMap(): void {
    this.map = new ConcreteMapC0H10();
    this.gameMode.setMapStrategy(this.map);
  }

  public getGameMode(): GameModeInterface {
    return this.gameMode;
  }
}
