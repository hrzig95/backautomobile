const config = require("../config/config");
const db = require("../models");
const Blog = db.blog;
const { authJwt } = require("../middlewares");


exports.addBlog = (req, res) => {
  // Save user to database
  Blog.create({
    titre: req.body.titre,
    description:req.body.description,
    validate:'pending'
  })
    .then(blog => {
            res.send({ message: "Blog was added successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.allBlog = (req, res) => {
  Blog.findAll()
    .then(blog => {
        res.send({ blog: blog });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getOneBlog = (req, res) => {
  const id = req.params.id;
  Blog.findByPk(id)
    .then(blog => {
        res.send({ blog: blog });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.deleteBlog = (req, res) => {
  Blog.destroy( {where: {
    id: req.params.id}})
    .then(blog => {
        res.send({ message: "blog was deleted successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.validateBlog = (req, res) => {
      Blog.update(
        { validate: 'validate' },
        { where: { id: req.body.id } }
      )
        .then(result =>{
            res.send({ message: "Blog was validated successfully!" });

        }
            )
        .catch(err =>{
            res.status(500).send({ message: err.message });
        }
    )        
  };


  exports.rejectBlog = (req, res) => {
    Blog.update(
      { validate: 'reject' },
      { where: { id: req.body.id } }
    )
      .then(result =>{
          res.send({ message: "Blog was rejected successfully!" });

      }
          )
      .catch(err =>{
          res.status(500).send({ message: err.message });

      }
  )

         
};

exports.updateBlog = (req, res) => {
  // Save user to database
  //authJwt.getIdByToken(req,res);
  let blog={id:req.body.id,titre:req.body.titre,description:req.body.description};
  Blog.update(blog, { where: { id: req.body.id }})
    .then(blog => {
    res.send({ message: "blog was updated successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};