const { authJwt } = require("../middlewares");
const controller = require("../controllers/voiture.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

   app.get("/voiture", controller.allVoiture);
   app.get("/voiture/:id", controller.getOneVoiture);


  app.post(
    "/voiture",controller.addVoiture
  );

  app.delete(
    "/voiture/:id",controller.deleteVoiture
  );

  app.post(
    "/updateVoiture",controller.updateVoiture
  );
};
