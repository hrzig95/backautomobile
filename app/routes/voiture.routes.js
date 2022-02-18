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
        "/voiture", controller.addVoiture
    );

    app.delete(
        "/voiture/:id", controller.deleteVoiture
    );

    app.post(
        "/updateVoiture", controller.updateVoiture
    );

    app.get(
        "/getUserCars", controller.getUserCars
    );

    app.post(
        "/carStatus", controller.carStatus
    );

    app.get(
        "/vendeurPro/:idUser", controller.getUserDetailsAndCars
    );

    app.get("/allTypeCar", controller.allTypeCar)
    app.get("/getMarque/:id_car_type", controller.getMarque)
    app.get("/getModel/:id_car_make", controller.getModel)
    app.get("/getGeneration/:id_car_model", controller.getGeneration)
    app.get("/getSerie/:id_car_generation", controller.getSerie)
    app.get("/getTrim/:id_car_serie", controller.getTrim)
    app.get("/getEquipement/:id_car_trim", controller.getEquipement)
    app.get("/getSpecification/:id_car_trim", controller.getSpecification)
    app.get("/carByMarque/:marque", controller.getCarByMarque)

};