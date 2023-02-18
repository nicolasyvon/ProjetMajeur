import express from "express";
import routes from "./api/routes.mjs";

const app = express();
app.use(express.json());
routes(app);
app.listen(process.env.MATCH_HANDLER_DOCKER_PORT || 8888);
