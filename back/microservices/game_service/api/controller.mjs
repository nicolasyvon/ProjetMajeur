import GameService from "../game_service.mjs";
import properties from "../package.json" assert { type: "json" };

const service = new GameService();

const controllers = {
  about: (req, res) => {
    const aboutInfo = {
      name: properties.name,
      version: properties.version,
    };
    res.json(aboutInfo);
  },

  start: (req, res) => {
    service.start(req.body);
    res.send("room created");
  },

  createGame: (req, res) => {
    if (service.gameExist(req.body.roomName)) {
      return res.status(500).send("Room name already used");
    }
    else{

      service.createGame(req.body)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(500).send("issue when creating the room, please try again")
      });
    }
    
  },

  notify: (req, res) => {
    if (!service.gameExist(req.body.roomName)) {
      return res.status(500).send("Room not found");
    }
    service.notify(req.body);
    res.send("msg sent");
  },

  setMap: (req, res) => {
    if (!service.gameExist(req.body.roomName)) {
      return res.status(500).send("Room not found");
    }
    service.setMap(req.body);
    res.send("msg sent");
  },

  getMap: (req, res) => {
    if (!service.gameExist(req.query.roomName)) {
      return res.status(500).send("Room not found");
    }
    res.send(service.getMap(req.query.roomName));
  },
};

export default controllers;
