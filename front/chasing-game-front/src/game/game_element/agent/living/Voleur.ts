import Mediator from "../../../interaction/mediator/Mediator.ts";
import Player from "./Player.ts";

class Voleur extends Player {

    constructor(scene:Phaser.Scene, mediator:Mediator) {
        super(scene, mediator);
        this.outlineColor = 0xc41c00;
        this.asset = 'voleur';
        this.denomination = 'thief';
    }

    static preload(scene) {
        scene.load.atlas('voleur', 'assets/animations/voleur.png',
         'assets/animations/voleur.json');
    }

    create(coord) {
        
        this.coord = coord;
        var postFxPlugin = this.scene.plugins.get('rexoutlinepipelineplugin');
        this.sprite = this.scene.matter.add.sprite(coord.x, coord.y, this.asset)
        this.sprite.setScale(1);
        this.sprite.setFrictionAir(0.2);
        this.sprite.setMass(10);
        
        this.sprite.setFixedRotation(true);

        postFxPlugin.add(this.sprite, {
            thickness: 3,
            outlineColor: this.outlineColor
        });

        this.scene.anims.create({
                key: 'thief_move_forward',
                frames: this.scene.anims.generateFrameNames('voleur', { prefix: 'walk_front/', start: 1, end: 9, zeroPad: 4 }),
                frameRate: 8,
                repeat:1
            });

        this.scene.anims.create({
            key: 'thief_move_behind',
            frames: this.scene.anims.generateFrameNames('voleur', { prefix: 'walk_back/', start: 1, end: 9, zeroPad: 4 }),
            frameRate: 8,
            repeat:1
        });

        this.scene.anims.create({
            key: 'thief_move_right',
            frames: this.scene.anims.generateFrameNames('voleur', { prefix: 'walk_right/', start: 1, end: 9, zeroPad: 4 }),
            frameRate: 8,
            repeat:1
        });
        
        this.scene.anims.create({
            key: 'thief_move_left',
            frames: this.scene.anims.generateFrameNames('voleur', { prefix: 'walk_left/', start: 1, end: 9, zeroPad: 4 }),
            frameRate: 8,
            repeat:1
        });

        this.scene.anims.create({
            key: 'thief_idle',
            frames: this.scene.anims.generateFrameNames('voleur', { prefix: 'walk_back/', start: 1, end: 1, zeroPad: 4 }),
            frameRate: 8,
            repeat:0
        });

        this.scene.anims.create({
            key: 'die',
            frames: this.scene.anims.generateFrameNames('voleur', { prefix: 'die/', start: 1, end: 6, zeroPad: 4 }),
            frameRate: 8,
            repeat:0
        });

        this.scene.anims.create({
            key: 'steal',
            frames: this.scene.anims.generateFrameNames('voleur', { prefix: 'steal/', start: 1, end: 6, zeroPad: 4 }),
            frameRate: 8,
            repeat:0
        });

        this.sprite.play('thief_idle');


        return this.sprite.body;

    }

    interactionResult(type: string) {

        switch(type){
            case "arrested":{
                if(!this.blocked){
                    this.sprite.play("die",true);
                    this.blocked = true;
                    this.speed = 0;
                }                

                break;
            }
            case "steal":{
                this.sprite.play("steal",true);
                break;

            }
        }
    }

}

export default Voleur