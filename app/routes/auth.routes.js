const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    app.post(
        "/signup", [
            verifySignUp.checkDuplicateUsernameOrEmail
        ],
        controller.signup
    );

    app.post("/signin", controller.signin);

    app.get("/allUsers", controller.allUsers);

    app.get("/getuserDetails", controller.getuserDetails);

    app.post("/updateInfo", controller.updateInfo);

    app.post("/updatePassword", controller.updatePassword);

    app.get("/blockUser/:id", controller.blockUser);
    app.get("/allProUsers", controller.allProUsers);

};