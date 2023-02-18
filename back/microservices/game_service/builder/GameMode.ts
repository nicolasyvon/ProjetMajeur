import VictoryStrategyInterface from "../strategy/Victory/VictoryStrategyInterface";
import TeamPercentageStrategyInterface from "../strategy/TeamPercentage/TeamPercentageStrategyInterface";
import MapStrategyInterface from "../strategy/Map/MapStrategyInterface";
import GameModeInterface from "./GameModeInterface";

// export default class GameModel implements GameModelInterface {
export default class GameMode implements GameModeInterface {
  victoryStrategy: VictoryStrategyInterface;
  teamPercentageStrategy: TeamPercentageStrategyInterface;
  mapStrategy: MapStrategyInterface;

  constructor() {
    // this.victoryList = [];
    // this.setGoalStrategy(victory);
    // this.teamPercentage = this.setTeamPercentageStrategy(teamPercentage);
    // this.map = this.setMapStrategy(map);
  }

  executeMap(data) {
    return this.mapStrategy.execute(data);
  }
  executeTeamPercentage(data) {
    return this.teamPercentageStrategy.execute(data);
  }
  executeVictory(data) {
    return this.victoryStrategy.execute(data);
  }

  setVictoryStrategy(victory: VictoryStrategyInterface) {
    this.victoryStrategy = victory;
  }

  setTeamPercentageStrategy(teamPercentage: TeamPercentageStrategyInterface) {
    this.teamPercentageStrategy = teamPercentage;
  }

  setMapStrategy(map: MapStrategyInterface) {
    this.mapStrategy = map;
  }

  // setTeamPercentageStrategy: () => TeamPercentageStrategyInterface;
  // setMapStrategy: () => MapStrategyInterface;
}
