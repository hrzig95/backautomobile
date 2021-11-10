module.exports = (sequelize, Sequelize, DataTypes) => {
  const User = sequelize.define(
    "user", // Model name
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.STRING
      },
      type: {
        type: DataTypes.STRING
      },
      username: {
        type: DataTypes.STRING
      },
      companyName: {
        type: DataTypes.STRING
      },
      companyCategory: {
        type: DataTypes.STRING
      },
      companyAddress: {
        type: DataTypes.STRING
      },
      companyZipCode: {
        type: DataTypes.STRING
      },
      companyPhone: {
        type: DataTypes.STRING
      },
      gender: {
        type: DataTypes.STRING
      },
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
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

  return User;
};
