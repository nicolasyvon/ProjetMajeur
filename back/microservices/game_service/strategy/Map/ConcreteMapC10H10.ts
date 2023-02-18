import { ChildProcessByStdio } from "child_process";
import { SortValues } from "mongoose";
import MapStrategyInterface from "./MapStrategyInterface";

class ConcreteMapC10H10 implements MapStrategyInterface {
    numberOfChest: number;
    numberOfHideout: number;
    valueOfChest:number;
    scoreToAchieve:number;
    score:number;

  constructor() {
    this.numberOfChest=10;
    this.numberOfHideout=10;
    this.valueOfChest=100;
    this.scoreToAchieve=0;
    this.score=0;
  }

  public execute(data): Object {
    const listOfChests: Object[] = []
    for (let i=0; i<this.numberOfChest;i++){
      this.scoreToAchieve+=this.valueOfChest;
      listOfChests.push(
        {
          chestId:i,
          chestValue:this.valueOfChest,
          state:'notFound'
        }
      )
    }
    return { chest: this.numberOfChest, hideout: this.numberOfHideout
      //, chestObject: listOfChests, scoreToAchieve: this.scoreToAchieve,score: this.score
    };
  }
}

export default ConcreteMapC10H10;
