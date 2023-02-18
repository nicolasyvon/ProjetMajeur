import Phaser from "phaser";
import Agent from "../Agent.ts";
import InteractiveAgent from "../InteractiveAgent.ts";
import Mediator from "../../../interaction/mediator/Mediator.ts";

abstract class Player extends Agent implements InteractiveAgent{

    outlineColor:number;
    speed:number = 20;
    isIdle:boolean = true;
    blocked = false;

    
    constructor(scene:Phaser.Scene, mediator:Mediator) {
        super(scene, mediator);
    }

    abstract interactionResult(type: string);

    abstract create(coord);

    goFoward() {
        if(!this.blocked){
            this.isIdle = false;
            this.sprite.play(this.denomination + "_move_forward",true);
            
            this.sprite.setVelocityY(-this.speed);
        }
        return {velocity:this.sprite.body.velocity, coord:this.sprite.body.position};
    }
    goBehind() {
        if(!this.blocked){
            this.isIdle = false;
            this.sprite.play(this.denomination + "_move_behind",true);
            this.sprite.setVelocityY(this.speed);
        }
        return {velocity:this.sprite.body.velocity, coord:this.sprite.body.position};

    }
    goLeft() {
        if(!this.blocked){
            this.isIdle = false;
            this.sprite.play(this.denomination + "_move_left",true);
            this.sprite.setVelocityX(-this.speed);
        }
        return {velocity:this.sprite.body.velocity, coord:this.sprite.body.position};

    }
    goRight() {
        if(!this.blocked){
            this.isIdle = false;
            this.sprite.play(this.denomination + "_move_right",true);
            this.sprite.setVelocityX(this.speed);
        }
        return {velocity:this.sprite.body.velocity, coord:this.sprite.body.position};
    }

    idle() {
        if(!this.blocked){
            this.isIdle = true;
            this.sprite.play(this.denomination + "_idle",true);
            this.sprite.setVelocity(0);
        }
        return {velocity:this.sprite.body.velocity, coord:this.sprite.body.position};
    }

    getIsIdle(){
        return this.isIdle;
    }

    setPosition(coords){
        this.sprite.x = coords.x;
        this.sprite.y = coords.y;
    }

    getPosition(){
        return this.sprite.body.position;
    }
    
    interact() {
        return this.mediator.notifylocal(this);
    }
}

export default Player;