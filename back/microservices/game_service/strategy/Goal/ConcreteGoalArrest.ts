import GoalStrategyInterface from "./GoalStrategyInterface";

class ConcreteGoalArrest implements GoalStrategyInterface {


  constructor() {

  }

  public execute(data: Object): Object {
    let numberThieves = data["listThieves"].length;

    data["gameState"]["listThievesArrested"].push(data["args"]["data"]["receiverId"])

    let numberThievesArrested = data["gameState"]["listThievesArrested"].length;
    
    if (numberThievesArrested == numberThieves) {
      data["gameState"]["finish"] = true;
      data["gameState"]["winner"] = "police";
    }
    return data;
  }
}

export default ConcreteGoalArrest;
