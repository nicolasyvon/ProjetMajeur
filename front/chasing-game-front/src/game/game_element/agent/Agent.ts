import Phaser from "phaser";
import Mediator from "../../interaction/mediator/Mediator.ts";

abstract class Agent {

    static id_generator: number = 1;
    scene: Phaser.Scene;
    sprite: Phaser.Physics.Matter.Sprite;
    denomination: string;
    asset:string;
    id: number;
    mediator:Mediator;
    coord;
    
    constructor(scene:Phaser.Scene,mediator:Mediator) {
        this.scene = scene;
        this.id = Agent.id_generator;
        this.mediator = mediator;
        Agent.id_generator += 1;        
    }
    
    static preload(scene: Phaser.Scene) {
        throw new Error('preload not defined');
    }

    abstract create(coord);

    getDenomination() {
        return this.denomination
    }

    getId(){
        return this.id;
    }

    setId(id){
        this.id = id;
    }

    getRange(): number {
        return 50;
    }

    getX(): number {
        return this.sprite.body.position.x;
    }

    getY(): number {
        return this.sprite.body.position.y;
    }

}
export default Agent; 