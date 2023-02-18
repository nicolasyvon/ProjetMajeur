import Phaser from "phaser";

class Leisure {

    scene:Phaser.Scene

    constructor(scene:Phaser.Scene) {
        this.scene = scene;
    }

    preload() {

    }

    create(polygonList) {
        
        polygonList.forEach(polygon => {
            
            let poly = this.scene.add.polygon(0, 0, polygon, 0x78de18);

        });

    }

}
export default Leisure;