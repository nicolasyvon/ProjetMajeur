import InteractionMediator from "../interaction/mediator/InteractionMediator.ts";
import Mediator from "../interaction/mediator/Mediator.ts";
import Object_creator from "./object_creator.ts";
import Player_creator from "./player_creator.ts";
import Map_creator from "./map_creator.ts";


class Creator{
    scene: Phaser.Scene;
    mediator: Mediator;

    constructor(scene:Phaser.Scene, mediator:Mediator){
        this.scene = scene;
        this.mediator = mediator;
    }

    create(){


        let mapData = this.scene.cache.custom.mapCache.get("mapData");
        let objectData = mapData.objectCollection;
        let playerCoords =  mapData.spawn;
        
        Map_creator.createMap(mapData.mapArea, this.scene);
        Object_creator.createObjects(objectData, this.scene, this.mediator);
        let [players, currentPlayer] = Player_creator.createPlayers( this.scene, this.mediator, playerCoords);

        return [players, currentPlayer]

    }
}
export default Creator;