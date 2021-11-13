const config = require("../config/config");
const { pictureVoiture, insideEquipmentVoiture, outsideEquipmentVoiture, securityEquipmentVoiture } = require("../models");
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
      let idVoiture= voiture.id;
      let voituresPicture=[];
      let outsides=[];
      let insides=[];
      let securities=[];
      let pictures= typeof req.body.pictures === "string" ? Array(req.body.pictures) :req.body.pictures;
      let insidesEquipment= typeof req.body.insideEquipment === "string" ? Array(req.body.insideEquipment) :req.body.insideEquipment;
      let outsidesEquipment= typeof req.body.outsideEquipment === "string" ? Array(req.body.outsideEquipment) :req.body.outsideEquipment;
      let securityEquipment= typeof req.body.securityEquipment === "string" ? Array(req.body.securityEquipment) :req.body.securityEquipment;

      for (let i=0;i<pictures.length;i++) 
  {
    picture={
      voitureId: idVoiture,
      picture: pictures[i]
    }
    voituresPicture.push(picture)
  }

  for (let i=0;i<insidesEquipment.length;i++) 
  {
    insideEquipement={
      voitureId: idVoiture,
      equipment: insidesEquipment[i]
    }
    insides.push(insideEquipement)
  }

  for (let i=0;i<outsidesEquipment.length;i++) 
  {
    outsideEquipement={
      voitureId: idVoiture,
      equipment: outsidesEquipment[i]
    }
    outsides.push(outsideEquipement)
  }

  for (let i=0;i<securityEquipment.length;i++) 
  {
    security={
      voitureId: idVoiture,
      equipment: securityEquipment[i]
    }
    securities.push(security)
  }
  pictureVoiture.bulkCreate(voituresPicture);
  insideEquipmentVoiture.bulkCreate(insides);
  outsideEquipmentVoiture.bulkCreate(outsides);
  securityEquipmentVoiture.bulkCreate(securities);
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
      insideEquipmentVoiture.destroy({where:{voitureId:req.params.id}});
      outsideEquipmentVoiture.destroy({where:{voitureId:req.params.id}});
      pictureVoiture.destroy({where:{voitureId:req.params.id}});
      securityEquipmentVoiture.destroy({where:{voitureId:req.params.id}});
        res.send({ message: "voiture was deleted successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};