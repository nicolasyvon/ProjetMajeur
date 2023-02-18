import GameMode from "builder/GameMode";
import StrategyTeamPercentageInterface from "./TeamPercentageStrategyInterface";

class ConcreteTeamPercentageDomThief
  implements StrategyTeamPercentageInterface
{
  constructor() {}

  public execute(data): Object {
    return { police: 0.3, thief: 0.7, priorityPolice: 0 };
  }
}

export default ConcreteTeamPercentageDomThief;
