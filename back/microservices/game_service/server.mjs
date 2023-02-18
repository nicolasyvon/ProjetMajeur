import express from "express";
import routes from "./api/routes.mjs";

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
routes(app);
app.listen(process.env.GAME_DOCKER_PORT || 6869);
