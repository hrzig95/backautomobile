const { authJwt } = require("../middlewares");
const controller = require("../controllers/publicite.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

   app.get("/publicite", controller.allPublicite);


  app.post(
    "/publicite",controller.addPublicite
  );

  app.delete(
    "/publicite/:id",controller.deletePublicite
  );

  app.post(
    "/validatePublicite",controller.validatePublicite
  );

  app.post(
    "/rejectPublicite",controller.rejectPublicite
  );

  app.get("/validatedPublicite", controller.allValidatedPublicite);

};
