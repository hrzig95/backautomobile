const config = require("../config/config");
const { pictureVoiture, insideEquipmentVoiture, outsideEquipmentVoiture, securityEquipmentVoiture } = require("../models");
const db = require("../models");
const { authJwt } = require("../middlewares");

const Voiture = db.voiture;
const User = db.user;

exports.addVoiture = (req, res) => {
  // Save user to database
  authJwt.getIdByToken(req,res);
  let idUser=req.userId;
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
    numberDoors:req.body.numberDoors,
    userId:idUser 
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

exports.updateVoiture = (req, res) => {
  // Save user to database
  authJwt.getIdByToken(req,res);
  let idUser=req.userId;
  let idVoiture=req.body.id;
  insideEquipmentVoiture.destroy({where:{voitureId:idVoiture}});
  outsideEquipmentVoiture.destroy({where:{voitureId:idVoiture}});
  pictureVoiture.destroy({where:{voitureId:idVoiture}});
  securityEquipmentVoiture.destroy({where:{voitureId:idVoiture}});
  let voiture={
    id:req.body.id,
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
    numberDoors:req.body.numberDoors,
    userId:idUser 
  }
  Voiture.update(voiture, { where: { id: idVoiture }})
    .then(voiture => {
     // let idVoiture= voiture.id;
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
  let arrayVoitures=[];
  Voiture.findAll({
    include: [
        pictureVoiture,
        securityEquipmentVoiture,
        insideEquipmentVoiture,
        outsideEquipmentVoiture
    ]
})
    .then(async(voitures) => {
      for(let i=0;i<voitures.length;i++){
        let user=await User.findOne(
          {where:{
            id:voitures[i].dataValues.userId
          },attributes: ['email', 'type','username']});
          voitures[i].dataValues.user=user 
      }
      
        res.send({ voitures: voitures });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getOneVoiture = (req, res) => {
  const id = req.params.id;
  Voiture.findOne({
    where: {
      id: id
    },
    include: [
      pictureVoiture,
      securityEquipmentVoiture,
      insideEquipmentVoiture,
      outsideEquipmentVoiture
  ]
  })
    .then(async(voiture) => {
      let user=await User.findOne(
      {where:{
        id:voiture.dataValues.userId
      },attributes: ['email', 'type','username']});
      voiture.dataValues.user=user 
        res.send({ voiture: voiture });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    })
};


exports.deleteVoiture = (req, res) => {
  insideEquipmentVoiture.destroy({where:{voitureId:req.params.id}});
  outsideEquipmentVoiture.destroy({where:{voitureId:req.params.id}});
  pictureVoiture.destroy({where:{voitureId:req.params.id}});
  securityEquipmentVoiture.destroy({where:{voitureId:req.params.id}});
  Voiture.destroy( {where: {
    id: req.params.id}})
    .then(voitures => {
        res.send({ message: "voiture was deleted successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};