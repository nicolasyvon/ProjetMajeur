import Building from "../game_element/agent/inert/area/Building.ts";
import Highway from "../game_element/agent/inert/area/Highway.ts";
import Landuse from "../game_element/agent/inert/area/Landuse.ts";
import Leisure from "../game_element/agent/inert/area/Leisure.ts";

class Map_Creator {

    static createMap(dataMap, scene) {

        let building = new Building(scene);
        let highway = new Highway(scene);
        let landuse = new Landuse(scene);
        let leisure = new Leisure(scene);

        highway.create(dataMap.find(df => df.type == "highway").polygons);
        landuse.create(dataMap.find(df => df.type == "landuse").polygons);
        leisure.create(dataMap.find(df => df.type == "leisure").polygons);
        building.create(dataMap.find(df => df.type == "building").polygons);

    }

}
export default Map_Creator;