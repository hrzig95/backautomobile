const config = require("../config/config.js");
const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize, DataTypes);
db.voiture = require("./voiture.model.js")(sequelize, Sequelize, DataTypes);
db.blog = require("./blog.model.js")(sequelize, Sequelize, DataTypes);
db.pictureVoiture = require("./pictureVoiture.model.js")(sequelize, Sequelize, DataTypes);
db.insideEquipmentVoiture = require("./insideEquipmentVoiture.model.js")(sequelize, Sequelize, DataTypes);
db.outsideEquipmentVoiture = require("./outsideEquipmentVoiture.model.js")(sequelize, Sequelize, DataTypes);
db.securityEquipmentVoiture = require("./securityEquipmentVoiture.model.js")(sequelize, Sequelize, DataTypes);

db.pictureVoiture.belongsTo(db.voiture);
db.insideEquipmentVoiture.belongsTo(db.voiture);
db.outsideEquipmentVoiture.belongsTo(db.voiture);
db.securityEquipmentVoiture.belongsTo(db.voiture);

db.voiture.hasMany(db.pictureVoiture,{
  onDelete:"cascade",
  allowNull: false,
});

db.voiture.hasMany(db.insideEquipmentVoiture,{
  onDelete:"cascade",
  allowNull: false,
});

db.voiture.hasMany(db.outsideEquipmentVoiture,{
  onDelete:"cascade",
  allowNull: false,
});

db.voiture.hasMany(db.securityEquipmentVoiture,{
  onDelete:"cascade",
  allowNull: false,
});

module.exports = db;
