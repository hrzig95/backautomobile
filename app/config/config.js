module.exports = {
  HOST: "localhost",
  USER: "sayara",
  PASSWORD: "121212Aa@24188358",
  DB:"sayara_db",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  auth:{secret: "bezkoder-secret-key"}
};