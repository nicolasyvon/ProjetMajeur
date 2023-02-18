import VictoryStrategyInterface from "./VictoryStrategyInterface";

import ConcreteGoalArrest from "../../strategy/Goal/ConcreteGoalArrest.js";
import ConcreteGoalScore from "../../strategy/Goal/ConcreteGoalScore.js";
import ConcreteGoalTimePolice from "../../strategy/Goal/ConcreteGoalTimePolice.js";

class ConcreteVictoryHoldUp implements VictoryStrategyInterface {
  goalArrest: ConcreteGoalArrest;
  goalScore: ConcreteGoalScore;
  goalTimePolice: ConcreteGoalTimePolice;

  constructor() {
    this.goalArrest = new ConcreteGoalArrest();
    this.goalScore = new ConcreteGoalScore();
    this.goalTimePolice = new ConcreteGoalTimePolice();
  }

  public execute(data: Object): Object {
    switch (data["args"]["data"]["interactionResult"]) {
      case "arrest":
        data = this.goalArrest.execute(data);
        break;
      case "steal":
        data = this.goalScore.execute(data);
        break;
      case "timeOut":
        data = this.goalTimePolice.execute(data);
    }
    return data;
  }
}

export default ConcreteVictoryHoldUp;
