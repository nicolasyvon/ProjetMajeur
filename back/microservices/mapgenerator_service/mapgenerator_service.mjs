import { createMap } from "./service/mapcreator_service.mjs";
import { GameMap } from "./model/Map.mjs";
import { findSpawnPoint, placeObject } from "./service/enrichment_service.mjs";

export default class MapGeneratorService {

    constructor() {
    }

    create(roomName, roomOptions) {
        createMap(roomName, roomOptions);
    }
        
        
}
      
