module.exports = (sequelize, Sequelize, DataTypes) => {
    const Publicite = sequelize.define(
      "publicite", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        frame: {
          type: DataTypes.STRING,
        },
        validate: {
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
  
    return Publicite;
  };
  