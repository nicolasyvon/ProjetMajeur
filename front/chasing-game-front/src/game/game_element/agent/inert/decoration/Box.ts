class Box {

    scene: Phaser.Scene;

    constructor(scene) {
        this.scene = scene;
    }
    /*
    preload() {
        this.scene.load.image('wall', '/assets/images/wall.png');
    }

    create(coord) {
        const sprite = this.scene.matter.add.sprite(coord.x, coord.y, 'assets/sprite/box.png', null, {isStatic: true});
        sprite.setScale(4);
    }
    */
}
export default Box;