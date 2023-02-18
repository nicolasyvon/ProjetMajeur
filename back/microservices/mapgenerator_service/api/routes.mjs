import controllers from './controller.mjs'

const routes = (app) => {
    app.route("/create").post(controllers.create);
    app.route("/object").post(controllers.object);
    app.route("/get").get(controllers.get);


}

export default routes;