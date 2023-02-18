import GameMode from "builder/GameMode";
import StrategyTeamPercentageInterface from "./TeamPercentageStrategyInterface";

class ConcreteTeamPercentageDomPolice
  implements StrategyTeamPercentageInterface
{
  constructor() {}

  public execute(data): Object {
    return { police: 0.7, thief: 0.3, priorityPolice: 1 };
  }
}

export default ConcreteTeamPercentageDomPolice;
