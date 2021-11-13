const { authJwt } = require("../middlewares");
const controller = require("../controllers/blog.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

   app.get("/blog", controller.allBlog);

   app.get("/blog/:id", controller.getOneBlog);

  app.post(
    "/blog",controller.addBlog
  );

  app.delete(
    "/blog/:id",controller.deleteBlog
  );

  app.post(
    "/validateBlog",controller.validateBlog
  );

  app.post(
    "/rejectBlog",controller.rejectBlog
  );
};
