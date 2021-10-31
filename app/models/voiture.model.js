module.exports = (sequelize, Sequelize, DataTypes) => {
    const Voiture = sequelize.define(
      "voiture", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        type: {
          type: DataTypes.STRING,
        }
      },
      {
        // Options
        timestamps: true,
        underscrored: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
      }
    );
  
    return Voiture;
  };
  