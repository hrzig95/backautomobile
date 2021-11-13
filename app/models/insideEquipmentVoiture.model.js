module.exports = (sequelize, Sequelize, DataTypes) => {
    const InsideEquipmentVoiture = sequelize.define(
      "insideEquipmentVoiture", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        equipment: {
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
  
    return InsideEquipmentVoiture;
  };
  