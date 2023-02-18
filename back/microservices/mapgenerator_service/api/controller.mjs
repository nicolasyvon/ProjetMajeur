import properties from "../package.json" assert { type: "json" };
import MapGeneratorService from "../mapgenerator_service.mjs";

const service = new MapGeneratorService();

const controllers = {
    about: (req, res) => {
        const aboutInfo = {
          name: properties.name,
          version: properties.version,
        };
        res.json(aboutInfo);
      },

      create: (req, res) => {
        service.create(
          req.body.roomName,
          req.body.roomOptions
        )
          res.send("Start map creation");
      },
      object: (req,res) => {
        res.send(
          service.addObject(
            req.body
          )
        );
      },
      get: (req,res) => {
        res.send(
          service.get(
            req.query.roomName
          )
        );
      }
};

export default controllers;
