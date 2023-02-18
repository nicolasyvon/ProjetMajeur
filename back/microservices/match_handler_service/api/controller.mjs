import properties from "../package.json" assert { type: "json" };
import MatchHandlerService from "../match_handler_service.mjs";

const service = new MatchHandlerService();

const controllers = {
  about: (req, res) => {
    const aboutInfo = {
      name: properties.name,
      version: properties.version,
    };
    res.json(aboutInfo);
  },

  join: (req, res) => {
    if (!service.roomExist(req.body.roomName)) {
      return res.status(500).send("Room not found");
    }
    if (
      service.join(req.body.roomName, req.body.userName,req.body.socketid , req.body.isTeamPolice)
    ) {
      res.send(`${req.body.roomName} joined`);
    } else {
      return res.status(500).send("Room full");
    }
  },

  create: (req, res) => {
    res.send(
      service.create(
        req.body.roomName,
        req.body.roomOptions,
        req.body.host,
        req.body.isTeamPolice,
        req.body.socketid
      )
    );
  },

  getPlayerInRoom: (req, res) => {
    if (!service.roomExist(req.query.roomName)) {
      return res.status(500).send("Room not found");
    }
    res.send(service.getPlayerInRoom(req.query.roomName));
  },

  start: (req, res) => {
    if (!service.roomExist(req.body.roomName)) {
      return res.status(500).send("Room not found");
    }
    res.send(service.start(req.body.roomName));
  },

};

export default controllers;
