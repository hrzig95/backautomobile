const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Voiture = db.voiture;
const Op = db.Op;


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
