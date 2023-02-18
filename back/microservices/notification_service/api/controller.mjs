import properties from "../package.json" assert { type: "json" };
import NotificationService from "../NotificationService.mjs";

const service = NotificationService.getInstance(null) ;

const controllers = {
    about: (req, res) => {
        const aboutInfo = {
            name: properties.name,
            version: properties.version,
            description: properties.description,
        }
        res.json(aboutInfo);
    },
   
    notifyUser: (req, res) => {
        let dest = req.body.dest;
        let event = req.body.event;
        let data = req.body.data;
        service.notifyUser(dest, event, data);
        res.send("OK");
    },

    usersConnected:(req, res) => {
        res.send(service.usersConnected());
    },

};

export default controllers