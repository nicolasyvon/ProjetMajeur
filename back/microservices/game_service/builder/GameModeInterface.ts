import MapStrategyInterface from "../strategy/Map/MapStrategyInterface";
import TeamPercentageStrategyInterface from "../strategy/TeamPercentage/TeamPercentageStrategyInterface";
import VictoryStrategyInterface from "../strategy/Victory/VictoryStrategyInterface";

export default interface GameModeInterface {
  executeMap: (data: Object) => Object;
  executeTeamPercentage: (data: Object) => Object;
  executeVictory: (data: Object) => Object;

  setVictoryStrategy: (victory: VictoryStrategyInterface) => void;
  setTeamPercentageStrategy: (
    teamPercentage: TeamPercentageStrategyInterface
  ) => void;
  setMapStrategy: (map: MapStrategyInterface) => void;
}
