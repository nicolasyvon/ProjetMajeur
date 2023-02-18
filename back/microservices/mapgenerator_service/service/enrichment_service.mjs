import { polygon } from "@turf/helpers";

function inside(point, polygon) {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html
    
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        var xi = polygon[i][0], yi = polygon[i][1];
        var xj = polygon[j][0], yj = polygon[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
};

export const findSpawnPoint = (max_x, max_y, dataMap) => {
    let x_police = Math.round(max_x / 5);
    let x_voleur = Math.round(max_x - (max_x / 5));
    let y_police = max_y - 5;
    let y_voleur = 5;

    let pointfindP=false;
    let pointfindV=false;

    let pointVoleur;
    let pointPolice;

    let buildings = dataMap.find(df => df.type == "building").polygons

    while(!(pointfindP & pointfindV)) {
        let freeAreaPolice = true;
        let freeAreaVoleur = true;
        
        for(let i = 0; i < buildings.length; i++) {
            freeAreaPolice = freeAreaPolice & !inside([x_police, y_police], buildings[i]);
            freeAreaVoleur = freeAreaVoleur & !inside([x_voleur, y_voleur], buildings[i]);
            if(! (freeAreaPolice & freeAreaVoleur)) {
                break;
            }
        }
        
        //console.log("en cours : " + [freeAreaPolice, freeAreaVoleur] + " | " + y_police);

        if (freeAreaPolice) {
            pointPolice = {x: x_police, y: y_police};
            pointfindP = true;
        } else {
            y_police -= 5;
        }
        if (freeAreaVoleur) {
            pointVoleur = {x: x_voleur, y: y_voleur};
            pointfindV = true;
        } else {
            y_voleur += 5;
        }
    }
    //console.log([pointPolice, pointVoleur]);

    return {police: pointPolice, thief: pointVoleur};
}

export const placeObject = (max_x, max_y, dataMap) => {
    let pointFind = false;
    let buildings = dataMap.find(df => df.type == "building").polygons;
    let x,y;
    while(!pointFind) {
        x = Math.floor(Math.random() * max_x);
        y = Math.floor(Math.random() * max_y);

        for(let i = 0; i < buildings.length; i++) {
            if (!inside([x, y], buildings[i])) {
                pointFind = true;
                break;
            }
        }
    }
    return {x: x, y: y};
}