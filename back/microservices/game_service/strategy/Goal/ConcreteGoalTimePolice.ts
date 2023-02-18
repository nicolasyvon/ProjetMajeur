import GoalStrategyInterface from "./GoalStrategyInterface";

class ConcreteGoalTimePolice implements GoalStrategyInterface {


  constructor() {

  }


  // public getTimeFinish(): Date {
  //   var currentDate = new Date();
  //   var futureDate = new Date(currentDate.getTime() + this.timerSeconds * 1000);

  //   var offset = futureDate.getTimezoneOffset() * 60000;
  //   var gmtDate = new Date(futureDate.getTime() + offset);

  //   return gmtDate;
  // }

  public execute(data: Object): Object {
    data["gameState"]["finish"] = true;
    data["gameState"]["winner"] = "police";

    return data;
  }
}

export default ConcreteGoalTimePolice;
