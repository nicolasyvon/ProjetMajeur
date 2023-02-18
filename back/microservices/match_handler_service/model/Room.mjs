export class Room {
    constructor(roomName,roomOptions,host){
        this.players = new Map();
        this.roomName = roomName;
        this.roomOptions = roomOptions;
        this.host = host;
    }
}

export class RoomOptions{

    constructor(areTeamsRandom,isPrivate,sizeTeam){
        this.areTeamsRandom = areTeamsRandom;
        this.isPrivate = isPrivate;
        this.sizeTeam = sizeTeam;
    }
}