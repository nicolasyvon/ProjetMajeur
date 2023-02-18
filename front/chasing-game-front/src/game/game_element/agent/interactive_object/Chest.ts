import Phaser from "phaser";
import InteractiveAgent from "../InteractiveAgent.ts";
import Agent from "../Agent.ts";
import Mediator from "../../../interaction/mediator/Mediator";

class Chest extends Agent implements InteractiveAgent {

    constructor(scene:Phaser.Scene, mediator:Mediator) {
        super(scene, mediator);
        this.denomination = 'chest';
        this.open = false;
    }
    interactionResult(type: string) {
        if (type == 'open' && !this.open) {
            this.sprite.play('open');
            this.open = true;
        }
    }

    static preload(scene) {
        scene.load.atlas('chest', 'assets/animations/chest.png', 'assets/animations/chest.json');
    }

    create(coord) {
        this.scene.anims.create({
            key: 'close',
            frames: this.scene.anims.generateFrameNames('chest', { prefix: 'close/', start: 1, end: 0, zeroPad: 4 }),
            frameRate: 8,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'open',
            frames: this.scene.anims.generateFrameNames('chest', { prefix: 'close/', start: 0, end: 1, zeroPad: 4 }),
            frameRate: 8,
            repeat: 0
        });

        this.sprite = this.scene.matter.add.sprite(coord.x, coord.y, 'assets/animations/chest.png', null, {isStatic: true});

        this.sprite.setScale(1);
        this.sprite.play('close');

        return this.sprite.body;

    }

}
export default Chest;