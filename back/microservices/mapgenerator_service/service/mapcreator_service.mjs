import OverpassFrontend from 'overpass-frontend';
import { findSpawnPoint, placeObject } from './enrichment_service.mjs';
import defaultData from '../model/DefaultData.mjs';
import axios from "axios";

function initDataFormat(){
    return [
        {
            type: 'building',
            polygons: [],
        },
        {
            type: 'leisure',
            polygons: [],
        },
        {
            type: 'landuse',
            polygons: [],
        },
        {
            type: 'highway',
            polygons: [],
        }
    ];
}

let [lat_min, lon_min, lat_max, lon_max] = [0,0,0,0];

const normalizeCoord = (lat, lon) => {
    let deltaX = Math.floor(5000);
    let deltaY = Math.floor(4000);

    let deltaLat = lat_max - lat_min;
    let deltaLon = lon_max - lon_min;

    lat = lat > lat_max ? lat_max: lat;
    lat = lat < lat_min ? lat_min: lat;
    lon = lon > lon_max ? lon_max: lon;
    lon = lon < lon_min ? lon_min: lon;
    
    let x = (lat - lat_min) * deltaX / deltaLat;
    let y = -1 * (lon - lon_max) * deltaY / deltaLon;

    //return {"x": Math.abs(Math.round(x)), "y": Math.abs(Math.round(y))};
    return [Math.abs(Math.round(x)), Math.abs(Math.round(y))];
}

const handleWayData = (wayObject, tagKey,dataformat) => {
    let normalizeCoords = [];
    wayObject.geometry.pop();
    wayObject.geometry.forEach(coordObject => {
        let lat = coordObject.lat;
        let lon = coordObject.lon;
        normalizeCoords.push(normalizeCoord(lat, lon));
    });
    dataformat.find(df => df.type == tagKey).polygons.push(normalizeCoords);
    //console.log("Union : ");
    //console.log(polygonClipping.union(dataformat.find(df => df.type == tagKey).polygons)[0]);
    //console.log("Fin union");
}

const handleRelationData = (relationObject, tagKey,dataformat) => {
    (relationObject.members).forEach(wayObject => {
        handleWayData(wayObject, tagKey,dataformat);
    });
}

const translateData = (jsonData,dataformat) => {
    let listType = [];
    dataformat.forEach(object => {
        listType.push(object.type);
    });

    let tagsKeys = Object.keys(jsonData.data.tags);
    for(let i = 0; i < tagsKeys.length; i++) {
        if (listType.includes(tagsKeys[i])) {
            if (jsonData.data.type == 'way') {
                handleWayData(jsonData.data, tagsKeys[i],dataformat);
            }
            if (jsonData.data.type == 'relation') {
                handleRelationData(jsonData.data, tagsKeys[i],dataformat);
            }
            break;
        }
    };
    //console.log(dataformat.find(df => df.type == 'building').polygons);
}

const createMap = (roomName, roomOptions) => {

    let dataformat = new Object();
    dataformat.mapArea = initDataFormat();
    dataformat.mapElements = roomOptions.mapElements;
    [lat_min, lon_min, lat_max, lon_max] = 
        [roomOptions.mapCoords.minlat,
        roomOptions.mapCoords.minlon,
        roomOptions.mapCoords.maxlat,
        roomOptions.mapCoords.maxlon];
    
    const queries = ['relation["highway"];',
                    'way[~"building"~".*"];',
                    'way[~"landuse"~".*"];',
                    'way[~"leisure"~".*"];'];

    let query_count = queries.length;

    // you may specify an OSM file as url, e.g. 'test/data.osm.bz2'
    const overpassFrontend = new OverpassFrontend('//overpass-api.de/api/interpreter')

    for(let i = 0; i < queries.length; i ++) {
        let query = queries[i];
        overpassFrontend.BBoxQuery(
            query,
            { minlat: lat_min, maxlat: lat_max, minlon: lon_min, maxlon: lon_max },
            { properties: OverpassFrontend.ALL },
            function (err, result) {
                translateData(result,dataformat.mapArea);
            },
            function (err) {
                if (err) {
                    dataformat = defaultData;
                    addObjectToMap(roomName, dataformat);
                }
                query_count -= 1;
                if (query_count == 0) {
                    addObjectToMap(roomName, dataformat);
                }
            }
        );
    }
}

const addObjectToMap = (roomName, map) => {
    let [max_x, max_y] = [Math.floor(5000), Math.floor(4000)];
    map.objectCollection = [];
    map.spawn = findSpawnPoint(max_x, max_y,map.mapArea);
    for (const property in map.mapElements) {
        let coords = [];
        for(let i = 0; i < map.mapElements[property]; i++){
            coords.push(placeObject(max_x, max_y, map.mapArea));
        }
        map.objectCollection.push({
            type:property,
            coords:coords
        });
    };
    //console.log(map);
    notifyGame(roomName, map);
}

const notifyGame = (roomName, map) => {
    let body = { roomName: roomName, map: map};
    axios.post(`http://game-service:${process.env.GAME_DOCKER_PORT}/setMap`,body)
    .catch((err) => {
        throw new Error(err);
    });
}

export {createMap};