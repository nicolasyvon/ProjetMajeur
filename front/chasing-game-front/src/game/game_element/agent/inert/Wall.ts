import Phaser from "phaser";

class Wall {

    scene: Phaser.Scene;
    vector: number[][];

    constructor(scene) {
        this.scene = scene;
    }

    preload() {
        this.scene.load.image('wall', '/assets/images/wall.png');
    }

    create(vector) {
        this.vector = vector;
        let xmin = this.vector[0][0];
        let ymin = this.vector[0][1];
        let xmax = this.vector[1][0];
        let ymax = this.vector[1][1];

        if (xmin > xmax) {
            [xmin, xmax] = [xmax, xmin];
        }
        if (ymin > ymax) {
            [ymin, ymax] = [ymax, ymin];
        }

        let angleRads = Math.atan2(ymax - ymin, xmax - xmin);
        var xdelta = Math.abs(xmax-xmin); 
        var ydelta = Math.abs(ymax-ymin); 

        let wall = this.scene.matter.add.image (
            xmin*64,
            ymin*32,
            'wall',
            null,
            {
                isStatic:true,      
            }
        );

        wall.setOrigin(0,0.5)

        let body = wall.body;
        let offset= {
            x:-wall.width/2,
            y:0
            }

            body.position.x += offset.x;
        body.position.y += offset.y;
        body.positionPrev.x += offset.x;
        body.positionPrev.y += offset.y;

        wall.setDisplaySize(
            xdelta != 0 ? wall.displayWidth 
            * xdelta:wall.displayWidth,wall.displayHeight) ;

        if(angleRads != 0){
            wall.setDisplaySize(
                xdelta == 0 && ydelta != 0 ? wall.displayWidth 
                * ydelta:wall.displayWidth,wall.displayHeight) ;   
            this.scene.matter.body.rotate(wall.body,angleRads)   
                    
        }
    }

}
export default Wall;