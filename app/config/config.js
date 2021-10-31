module.exports = {
  HOST: "localhost",
  USER: "sayara",
  PASSWORD: "",
  DB:"locationvoiture",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  auth:{secret: "bezkoder-secret-key"}
};