import VictoryStrategyInterface from "./VictoryStrategyInterface";

import ConcreteGoalArrest from "../../strategy/Goal/ConcreteGoalArrest.js";
import ConcreteGoalTimeThief from "../../strategy/Goal/ConcreteGoalTimeThief.js";

class ConcreteVictoryCatMouse implements VictoryStrategyInterface {
  goalArrest: ConcreteGoalArrest;
  goalTimeThief: ConcreteGoalTimeThief;

  constructor() {
    this.goalArrest = new ConcreteGoalArrest();
    this.goalTimeThief = new ConcreteGoalTimeThief();
  }

  public execute(data: Object): Object {
    switch (data["args"]["data"]["interactionResult"]) {
      case "arrest":
        data = this.goalArrest.execute(data);
        break;
      case "timeOut":
        data = this.goalTimeThief.execute(data);
    }
    return data;
  }

}

export default ConcreteVictoryCatMouse;
