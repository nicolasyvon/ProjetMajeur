import Phaser from "phaser";

class Highway {

    scene:Phaser.Scene

    constructor(scene:Phaser.Scene) {
        this.scene = scene;
    }

    preload() {

    }

    create(polygonList) {
        
        polygonList.forEach(polygon => {
            
            let poly = this.scene.add.polygon(0, 0, polygon, 0xd4b26a);

        });

    }

}
export default Highway;