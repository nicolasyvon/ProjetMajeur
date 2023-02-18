import GameMode from "builder/GameMode";
import StrategyTeamPercentageInterface from "./TeamPercentageStrategyInterface";

class ConcreteTeamPercentageEqual implements StrategyTeamPercentageInterface {
  constructor() {}

  public execute(data): Object {
    return { police: 0.5, thief: 0.5, priorityPolice: 0 };
  }
}

export default ConcreteTeamPercentageEqual;
