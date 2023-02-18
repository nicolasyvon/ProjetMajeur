import GoalStrategyInterface from "./GoalStrategyInterface";

class ConcreteGoalScore implements GoalStrategyInterface {
  value:number;
  constructor() {
    this.value = 100
  }

  public execute(data: Object): Object {
    
    let scoreToAchieve = data["gameState"]["scoreToAchieve"];
    let score = data["gameState"]["score"];
    
    score += this.value;
    data["gameState"]["score"]=score;

    if (score ==scoreToAchieve) {
      data["gameState"]["finish"] = true;
      data["gameState"]["winner"] = "thief";
    }

    return data;
  }

}

export default ConcreteGoalScore;
