import Phaser from "phaser";

class Building {

    scene:Phaser.Scene

    constructor(scene:Phaser.Scene) {
        this.scene = scene;
    }

    getCentroid(initialPolygon) {

        let x:number[] = [];
        let y:number[] = [];
        initialPolygon.map(coord => {
            x.push(coord[0]);
            y.push(coord[1]);
        })
        let polygon:number[][] = [];
        let xmin = Math.min(...x);
        let ymin = Math.min(...y);
        initialPolygon.map(coord => {
            polygon.push([coord[0]-xmin, coord[1]-ymin]);
        })
        
        let Cx = 0;
        let Cy = 0;
        let A = 0;

        for(let i = 0; i < polygon.length; i ++) {
            if (i < polygon.length-1) {
                A += polygon[i][0]*polygon[i+1][1]-polygon[i+1][0]*polygon[i][1];
                Cx += (polygon[i][0]+polygon[i+1][0])*(polygon[i][0]*polygon[i+1][1]-polygon[i+1][0]*polygon[i][1]);
                Cy += (polygon[i][1]+polygon[i+1][1])*(polygon[i][0]*polygon[i+1][1]-polygon[i+1][0]*polygon[i][1]);
            }
            else {
                A = (A + polygon[i][0]*polygon[0][1]-polygon[0][0]*polygon[i][1]) / 2;
                Cx += (polygon[i][0]+polygon[0][0])*(polygon[i][0]*polygon[0][1]-polygon[0][0]*polygon[i][1]);
                Cy += (polygon[i][1]+polygon[0][1])*(polygon[i][0]*polygon[0][1]-polygon[0][0]*polygon[i][1]);
            }
        }
        Cx /= 6*A;
        Cy /= 6*A;
        
        return [Cx, Cy];
    }

    cloisonBuilder(x1, y1, x2, y2, centroid) {
        let Lx = x2 - x1;
        let Ly = y2 - y1;
        let L = Math.sqrt(Math.pow(Lx, 2) + Math.pow(Ly, 2));
        let theta = Math.atan(Lx/Ly) * 180 / (Math.PI);
        let wall = this.scene.add.rectangle(x1+(Lx/2)-centroid[0], y1+(Ly/2)-centroid[1], 2, L, 0x000000, 0);
        this.scene.matter.add.gameObject(wall, { isStatic: true });
        wall.setAngle(-theta);

    }

    preload() {

    }

    create(polygonList) {
       
        //polygon = '40 0 40 20 100 20 100 80 40 80 40 100 0 50'
        //const body = this.scene.matter.add.fromVertices(0, 0, polygon);

        //const building = this.scene.add.group();
        polygonList.forEach(polygon => {
            
            let poly = this.scene.add.polygon(0, 0, polygon, 0x09090a);
            let centroid = this.getCentroid(polygon);
            
            for (let i = 0; i < polygon.length; i ++) {
                if (i < polygon.length - 1) {
                    this.cloisonBuilder(polygon[i][0],polygon[i][1],polygon[i+1][0], polygon[i+1][1], centroid);
                } else {
                    this.cloisonBuilder(polygon[i][0],polygon[i][1],polygon[0][0], polygon[0][1], centroid);
                }
            }

        });
        
    }

}
export default Building;