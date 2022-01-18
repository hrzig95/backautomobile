const config = require("../config/config");
const { pictureVoiture, insideEquipmentVoiture, outsideEquipmentVoiture, securityEquipmentVoiture } = require("../models");
const db = require("../models");
const { authJwt } = require("../middlewares");
const { QueryTypes } = require('sequelize');

const Voiture = db.voiture;
const User = db.user;

exports.addVoiture = (req, res) => {
    // Save user to database
    authJwt.getIdByToken(req, res);
    let idUser = req.userId;
    let voitureOption = {
        model: {
            model: {
                id: req.body.model.id,
                value: req.body.model.value
            },
            trims: {
                id: req.body.trims.id,
                value: req.body.trims.value
            },
            generation: {
                id: req.body.generation.id,
                value: req.body.generation.value
            },
            serie: {
                id: req.body.serie.id,
                value: req.body.serie.value
            }
        }
    }
    let voiture = {
        title: req.body.title,
        availablity: req.body.availablity,
        phone: req.body.phone,
        city: req.body.city,
        brand: req.body.brand,
        type: req.body.type,
        price: req.body.price,
        color: req.body.color,
        carrosserie: req.body.carrosserie,
        guarantee: req.body.guarantee,
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
        voitureOption: voitureOption,
        status: 'pending',
        userId: idUser
    }
    Voiture.create(voiture)
        .then(voiture => {
            let idVoiture = voiture.id;
            let voituresPicture = [];
            let outsides = [];
            let insides = [];
            let securities = [];
            let pictures = typeof req.body.pictures === "string" ? Array(req.body.pictures) : req.body.pictures;
            let insidesEquipment = typeof req.body.insideEquipment === "string" ? Array(req.body.insideEquipment) : req.body.insideEquipment;
            let outsidesEquipment = typeof req.body.outsideEquipment === "string" ? Array(req.body.outsideEquipment) : req.body.outsideEquipment;
            let securityEquipment = typeof req.body.securityEquipment === "string" ? Array(req.body.securityEquipment) : req.body.securityEquipment;

            for (let i = 0; i < pictures.length; i++) {
                picture = {
                    voitureId: idVoiture,
                    picture: pictures[i]
                }
                voituresPicture.push(picture)
            }

            for (let i = 0; i < insidesEquipment.length; i++) {
                insideEquipement = {
                    voitureId: idVoiture,
                    equipment: insidesEquipment[i]
                }
                insides.push(insideEquipement)
            }

            for (let i = 0; i < outsidesEquipment.length; i++) {
                outsideEquipement = {
                    voitureId: idVoiture,
                    equipment: outsidesEquipment[i]
                }
                outsides.push(outsideEquipement)
            }

            for (let i = 0; i < securityEquipment.length; i++) {
                security = {
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
    authJwt.getIdByToken(req, res);
    let idUser = req.userId;
    let idVoiture = req.body.id;
    insideEquipmentVoiture.destroy({ where: { voitureId: idVoiture } });
    outsideEquipmentVoiture.destroy({ where: { voitureId: idVoiture } });
    pictureVoiture.destroy({ where: { voitureId: idVoiture } });
    securityEquipmentVoiture.destroy({ where: { voitureId: idVoiture } });
    let voitureOption = {
        model: {
            model: {
                id: req.body.model.id,
                value: req.body.model.value
            },
            trims: {
                id: req.body.trims.id,
                value: req.body.trims.value
            },
            generation: {
                id: req.body.generation.id,
                value: req.body.generation.value
            },
            serie: {
                id: req.body.serie.id,
                value: req.body.serie.value
            }
        }
    }
    let voiture = {
        id: req.body.id,
        title: req.body.title,
        availablity: req.body.availablity,
        phone: req.body.phone,
        city: req.body.city,
        brand: req.body.brand,
        type: req.body.type,
        price: req.body.price,
        color: req.body.color,
        carrosserie: req.body.carrosserie,
        guarantee: req.body.guarantee,
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
        voitureOption: voitureOption,
        userId: idUser
    }
    Voiture.update(voiture, { where: { id: idVoiture } })
        .then(voiture => {
            // let idVoiture= voiture.id;
            let voituresPicture = [];
            let outsides = [];
            let insides = [];
            let securities = [];
            let pictures = typeof req.body.pictures === "string" ? Array(req.body.pictures) : req.body.pictures;
            let insidesEquipment = typeof req.body.insideEquipment === "string" ? Array(req.body.insideEquipment) : req.body.insideEquipment;
            let outsidesEquipment = typeof req.body.outsideEquipment === "string" ? Array(req.body.outsideEquipment) : req.body.outsideEquipment;
            let securityEquipment = typeof req.body.securityEquipment === "string" ? Array(req.body.securityEquipment) : req.body.securityEquipment;

            for (let i = 0; i < pictures.length; i++) {
                picture = {
                    voitureId: idVoiture,
                    picture: pictures[i]
                }
                voituresPicture.push(picture)
            }

            for (let i = 0; i < insidesEquipment.length; i++) {
                insideEquipement = {
                    voitureId: idVoiture,
                    equipment: insidesEquipment[i]
                }
                insides.push(insideEquipement)
            }

            for (let i = 0; i < outsidesEquipment.length; i++) {
                outsideEquipement = {
                    voitureId: idVoiture,
                    equipment: outsidesEquipment[i]
                }
                outsides.push(outsideEquipement)
            }

            for (let i = 0; i < securityEquipment.length; i++) {
                security = {
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
    let arrayVoitures = [];
    Voiture.findAll({
            include: [
                pictureVoiture,
                securityEquipmentVoiture,
                insideEquipmentVoiture,
                outsideEquipmentVoiture
            ]
        })
        .then(async(voitures) => {
            for (let i = 0; i < voitures.length; i++) {
                let user = await User.findOne({
                    where: {
                        id: voitures[i].dataValues.userId
                    },
                    attributes: ['email', 'type', 'username']
                });
                voitures[i].dataValues.user = user
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
            let user = await User.findOne({
                where: {
                    id: voiture.dataValues.userId
                },
                attributes: ['email', 'type', 'username']
            });
            voiture.dataValues.user = user
            res.send({ voiture: voiture });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
};


exports.deleteVoiture = (req, res) => {
    insideEquipmentVoiture.destroy({ where: { voitureId: req.params.id } });
    outsideEquipmentVoiture.destroy({ where: { voitureId: req.params.id } });
    pictureVoiture.destroy({ where: { voitureId: req.params.id } });
    securityEquipmentVoiture.destroy({ where: { voitureId: req.params.id } });
    Voiture.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(voitures => {
            res.send({ message: "voiture was deleted successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.getUserCars = (req, res) => {
    let arrayVoitures = [];
    authJwt.getIdByToken(req, res);
    let idUser = req.userId;
    Voiture.findAll({
            where: {
                userId: idUser
            },
            include: [
                pictureVoiture,
                securityEquipmentVoiture,
                insideEquipmentVoiture,
                outsideEquipmentVoiture
            ]
        })
        .then(async(voitures) => {
            for (let i = 0; i < voitures.length; i++) {
                let user = await User.findOne({
                    where: {
                        id: voitures[i].dataValues.userId
                    },
                    attributes: ['email', 'type', 'username']
                });
                voitures[i].dataValues.user = user
            }

            res.send({ voitures: voitures });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.getUserDetailsAndCars = (req, res) => {
    let arrayVoitures = [];
    let idUser = req.params.idUser;
    Voiture.findAll({
            where: {
                userId: idUser
            },
            include: [
                pictureVoiture,
                securityEquipmentVoiture,
                insideEquipmentVoiture,
                outsideEquipmentVoiture
            ]
        })
        .then(async(voitures) => {
            for (let i = 0; i < voitures.length; i++) {
                let user = await User.findOne({
                    where: {
                        id: voitures[i].dataValues.userId
                    },
                    attributes: ['email', 'type', 'username']
                });
                voitures[i].dataValues.user = user
            }
            let user = await User.findOne({
                where: {
                    id: idUser
                },
                attributes: { exclude: ['password'] }
            });
            res.send({ voitures: voitures, user: user });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
exports.carStatus = (req, res) => {
    let status = req.body.status;
    let idVoiture = req.body.id;
    let voiture = { status: status }
    Voiture.update(voiture, { where: { id: idVoiture } })
        .then(voiture => {
            res.send({ message: "car status was updated successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.allTypeCar = (req, res) => {
    db.sequelize.query("SELECT * FROM `car_type`", { type: QueryTypes.SELECT })
        .then((car_type) => {
            res.send({ car_type });
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });

};

exports.getMarque = (req, res) => {
    db.sequelize.query("SELECT * FROM `car_make` WHERE id_car_type=" + req.params.id_car_type, { type: QueryTypes.SELECT })
        .then((car_make) => {
            res.send({ car_make });
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });

};

exports.getModel = (req, res) => {
    db.sequelize.query("SELECT * FROM `car_model` WHERE id_car_make=" + req.params.id_car_make, { type: QueryTypes.SELECT })
        .then((car_model) => {
            res.send({ car_model });
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });

};

exports.getGeneration = (req, res) => {
    db.sequelize.query("SELECT * FROM `car_generation` WHERE id_car_model=" + req.params.id_car_model, { type: QueryTypes.SELECT })
        .then((car_generation) => {
            res.send({ car_generation });
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });

};

exports.getSerie = (req, res) => {
    db.sequelize.query("SELECT * FROM `car_serie` WHERE id_car_generation=" + req.params.id_car_generation, { type: QueryTypes.SELECT })
        .then((car_serie) => {
            res.send({ car_serie });
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });

};

exports.getTrim = (req, res) => {
    db.sequelize.query("SELECT * FROM `car_trim` WHERE id_car_serie=" + req.params.id_car_serie, { type: QueryTypes.SELECT })
        .then((car_trim) => {
            res.send({ car_trim });
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });

};

exports.getEquipement = (req, res) => {
    db.sequelize.query("SELECT * FROM `car_equipment` WHERE id_car_trim=" + req.params.id_car_trim, { type: QueryTypes.SELECT })
        .then((car_equipment) => {
            res.send({ car_equipment });
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });

};

exports.getSpecification = async(req, res) => {

    let specifications = [];
    let car_speification_value = await db.sequelize.query("SELECT * FROM `car_specification_value` WHERE id_car_trim=" + req.params.id_car_trim, { type: QueryTypes.SELECT })
    for (let i = 0; i < car_speification_value.length; i++) {
        let car_specification = await db.sequelize.query("SELECT * FROM `car_specification` WHERE id_car_specification=" + car_speification_value[i].id_car_specification, { type: QueryTypes.SELECT })
        for (let j = 0; j < car_specification.length; j++) {
            if (car_specification[j].id_car_specification === car_speification_value[i].id_car_specification) {
                let unit = car_speification_value[i].unit ? " " + car_speification_value[i].unit : "";
                specification = {
                    name: car_specification[j].name,
                    value: car_speification_value[i].value + unit
                }
                specifications.push(specification);
            }

        }
    }
    res.send({ specifications });

};