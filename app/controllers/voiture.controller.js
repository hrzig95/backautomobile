const config = require("../config/config");
const { pictureVoiture } = require("../models");
const db = require("../models");
const Voiture = db.voiture;


exports.addVoiture = (req, res) => {
  // Save user to database
  let voiture={
    title:req.body.title,
    availablity: req.body.availablity,
    phone: req.body.phone,
    city:req.body.city,
    brand: req.body.brand,
    model:req.body.model,
    price: req.body.price,
    color: req.body.color,
    carrosserie: req.body.carrosserie,
    guarantee: req.body.guarantee,
    month: req.body.month,
    year: req.body.year,
    category: req.body.category,
    address: req.body.address,
    motorization: req.body.motorization,
    mileage: req.body.mileage,
    energy: req.body.energy,
    transmission: req.body.transmission,
    powerFiscal: req.body.powerFiscal,
    gearbox: req.body.gearbox,
    description: req.body.description,
    seatingCapacity: req.body.seatingCapacity,
    numberDoors:req.body.numberDoors 
  }
  Voiture.create(voiture)
    .then(voiture => {
      let voituresPicture=[];
      let idVoiture= voiture.id;
      let pictures= typeof req.body.link === "string" ? Array(req.body.pictures) :req.body.pictures;
  for (let i=0;i<pictures.length;i++) 
  {
    picture={
      voiture: idVoiture,
      picture: pictures[i]
    }
    voituresPicture.push(picture)
  }
  pictureVoiture.bulkCreate(voituresPicture).then(()=>{
    res.send({ message: "voiture was registered successfully!" });
  }).catch(err=>{
      res.status(500).send({ message: err.message });
  });
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

exports.deleteVoiture = (req, res) => {
  Voiture.destroy( {where: {
    id: req.params.id}})
    .then(voitures => {
        res.send({ message: "voiture was deleted successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};