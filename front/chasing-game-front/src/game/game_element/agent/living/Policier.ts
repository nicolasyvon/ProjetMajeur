import Player from "./Player.ts";
import Mediator from "../../../interaction/mediator/Mediator.ts";


class Policier extends Player {

    constructor(scene:Phaser.Scene, mediator:Mediator) {
        super(scene, mediator);
        this.denomination = 'police';
        this.outlineColor = 0x3374ff;
        this.asset = 'police';

    }

    static preload(scene) {
        scene.load.atlas('police', 'assets/animations/police.png',
         'assets/animations/police.json');
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
            key: 'police_move_forward',
            frames: this.scene.anims.generateFrameNames('police', { prefix: 'walk_front/', start: 1, end: 9, zeroPad: 4 }),
            frameRate: 8,
            repeat:1
        });

        this.scene.anims.create({
            key: 'police_move_behind',
            frames: this.scene.anims.generateFrameNames('police', { prefix: 'walk_back/', start: 1, end: 9, zeroPad: 4 }),
            frameRate: 8,
            repeat:1
        });

        this.scene.anims.create({
            key: 'police_move_right',
            frames: this.scene.anims.generateFrameNames('police', { prefix: 'walk_right/', start: 1, end: 9, zeroPad: 4 }),
            frameRate: 8,
            repeat:1
        });
        
        this.scene.anims.create({
            key: 'police_move_left',
            frames: this.scene.anims.generateFrameNames('police', { prefix: 'walk_left/', start: 1, end: 9, zeroPad: 4 }),
            frameRate: 8,
            repeat:1
        });

        this.scene.anims.create({
            key: 'police_idle',
            frames: this.scene.anims.generateFrameNames('police', { prefix: 'walk_back/', start: 1, end: 1, zeroPad: 4 }),
            frameRate: 8,
            repeat:0
        });

        this.scene.anims.create({
            key: 'arrest',
            frames: this.scene.anims.generateFrameNames('police', { prefix: 'arrest/', start: 1, end: 6, zeroPad: 4 }),
            frameRate: 8,
            repeat:0
        });

        this.sprite.play('police_idle');

        return this.sprite.body;

    }

    interactionResult(type: string) {
        switch(type){
            case "arrest":{
                this.sprite.play("arrest",true);
                break;

            }
        }
    }

}

export default Policier