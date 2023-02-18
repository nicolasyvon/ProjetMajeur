import express from "express";
import routes from "./api/routes.mjs";


const app = express();
app.use(express.json());
routes(app);
app.listen(process.env.MAPGENERATOR_DOCKER_PORT || 5858);