const config = require("../config/config");
const db = require("../models");
const Voiture = db.voiture;


exports.addVoiture = (req, res) => {
  // Save user to database
  Voiture.create({
    type: req.body.type
  })
    .then(voiture => {
            res.send({ message: "voiture was registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.allVoiture = (req, res) => {
  Voiture.findAll()
    .then(voitures => {
        res.send({ voitures: voitures });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
