import axios from "axios";
import { Room } from "./model/Room.mjs";

export default class MatchHandlerService {
  constructor() {
    this.roomQueue = [];
  }

  roomExist(roomName) {
    return this.roomQueue.find((r) => r.roomName == roomName) !== undefined;
  }

  isRoomFull(room) {
    let sizeTeam = room.roomOptions.sizeTeam;
    return room.players.size == sizeTeam;
  }

  join(roomName, userName, socketid, isTeamPolice) {
    let room = this.roomQueue.find((r) => r.roomName == roomName);
    if (room) {
      if (this.isRoomFull(room)) {
        return false;
      }
      isTeamPolice = this.addPlayerToRoom(
        room,
        userName,
        isTeamPolice,
        socketid
      );
      this.notifyRoom(
        room,
        userName,
        { userName: userName, isTeamPolice: isTeamPolice, socketid: socketid },
        "userJoinedRoom"
      );
      return true;
    }
  }

  // roomOptions = {areTeamsRandom, isPrivate, sizeTeam}
  create(roomName, roomOptions, host, isTeamPolice,socketid) {
    let newRoom = new Room(roomName, roomOptions, host);
    this.addPlayerToRoom(newRoom, host, isTeamPolice, socketid);
    this.roomQueue.push(newRoom);
    return `${roomName} created`;
  }

  addPlayerToRoom(room, userName, isTeamPolice, socketid) {
    if (!room.roomOptions.areTeamsRandom) {
      if (isTeamPolice)
        room.players.set(userName, { team: "police", socketid: socketid });
      else room.players.set(userName, { team: "thief", socketid: socketid });
    } else {
      return this.randomlyAddPlayerToRoom(room, userName, socketid);
    }
    return isTeamPolice;
  }

  randomlyAddPlayerToRoom(room, userName, socketid) {
    //room.roomOptions.percentage  => { police: 0.3, thief: 0.7, priorityPolice:1 }

    let isTeamPolice = true;
    let percentage = room.roomOptions.percentage;
    let players = Array.from( room.players.values());
    let teamPolice = players.filter(p => p.team == "police").length;
    let teamThief = players.filter(p => p.team == "thief").length;
    if (teamPolice == 0 | teamPolice/(teamPolice + teamThief) < percentage.police) {
        room.players.set(userName,{team:'police',socketid:socketid});
    } 
    else if (teamThief == 0 |teamThief/(teamPolice + teamThief) < percentage.thief){
        room.players.set(userName,{team:'thief',socketid:socketid});
        isTeamPolice = false;
    }

    return isTeamPolice;
  }

  start(roomName) {
    let room = this.roomQueue.find((r) => r.roomName == roomName);
    let body = { 
      players: Array.from(room.players.keys()),
      team: this.getTeamList(room),
      roomName: room.roomName
    };
    axios.post(`http://game-service:${process.env.GAME_DOCKER_PORT}/start`,body)
          .catch((err) => {
            throw new Error(err);
          });
    this.roomQueue = this.roomQueue.filter((r) => r.roomName != roomName);
    return "game started"
  }

  getTeamList(room) {
    let res = [];
    Array.from(room.players.values()).forEach((value) => res.push(value.team));
    return res;
  }

  getSocketList(room) {
    let res = [];
    Array.from(room.players.values()).forEach((value) =>
      res.push(value.socketid)
    );
    return res;
  }

  notifyRoom(room, userName, data, event) {
    Array.from(room.players.keys()).forEach((user) => {
      if(user != userName){
        let body = { event: event, data: data, dest: user, src: userName, isIdneeded: true};
        axios.post(
            `http://notification-service:${process.env.NOTIFICATION_DOCKER_PORT}/notifyUser`,
            body
          )
          .catch((err) => {
            throw new Error(err);
          });
      }
    });
  }

  getPlayerInRoom(roomName) {
    let room = this.roomQueue.find((r) => r.roomName == roomName);
    let body = {
      players: Array.from(room.players.keys()),
      socketids: this.getSocketList(room),
      team: this.getTeamList(room),
      host: room.host,
    };
    return body;
  }
}
