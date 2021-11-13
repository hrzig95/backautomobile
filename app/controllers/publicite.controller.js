const config = require("../config/config");
const db = require("../models");
const Publicite = db.publicite;


exports.addPublicite = (req, res) => {
  // Save user to database
  Publicite.create({
    frame: req.body.frame,
    validate:'pending'
  })
    .then(publicite => {
            res.send({ message: "Publicite was added successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.allPublicite = (req, res) => {
    Publicite.findAll()
    .then(publicite => {
        res.send({ publicite: publicite });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getOnePublicite = (req, res) => {
    const id = req.params.id;
    Publicite.findByPk(id)
      .then(publicite => {
          res.send({ publicite: publicite });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

exports.deletePublicite = (req, res) => {
    Publicite.destroy( {where: {
    id: req.params.id}})
    .then(publicite => {
        res.send({ message: "publicite was deleted successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.validatePublicite = (req, res) => {
    Publicite.update(
        { validate: 'validate' },
        { where: { id: req.body.id } }
      )
        .then(result =>{
            res.send({ message: "Publicite was validated successfully!" });

        }
            )
        .catch(err =>{
            res.status(500).send({ message: err.message });
        }
    )        
  };


  exports.rejectPublicite = (req, res) => {
    Publicite.update(
      { validate: 'reject' },
      { where: { id: req.body.id } }
    )
      .then(publicite =>{
          res.send({ message: "Publicite was rejected successfully!" });

      }
          )
      .catch(err =>{
          res.status(500).send({ message: err.message });

      }
  )

         
};

exports.allValidatedPublicite = (req, res) => {
    Publicite.findAll(
        { where: { validate: "validate" }}
    )
    .then(publicite => {
        res.send({ publicite: publicite });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};