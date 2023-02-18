import controllers from "./controller.mjs";

const routes = (app) => {
  app.route("/about").get(controllers.about);
  app.route("/notify").post(controllers.notify);
  app.route("/start").post(controllers.start);
  app.route("/create").post(controllers.createGame);
  app.route("/setMap").post(controllers.setMap);
  app.route("/getMap").get(controllers.getMap);


};

export default routes;
