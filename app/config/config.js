module.exports = {
  HOST: "https://sayara.tn:2083/",
  USER: "root",
  PASSWORD: "",
  DB:"sayara_db",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};