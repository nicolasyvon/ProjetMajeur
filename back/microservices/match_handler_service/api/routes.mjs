import controllers from "./controller.mjs";

const routes = (app) => {
  app.route("/about").get(controllers.about);
  app.route("/join").post(controllers.join);
  app.route("/create").post(controllers.create);
  app.route("/getPlayerInRoom").get(controllers.getPlayerInRoom);
  app.route("/start").post(controllers.start);
};

export default routes;
