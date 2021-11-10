module.exports = (sequelize, Sequelize, DataTypes) => {
    const Blog = sequelize.define(
      "blog", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        titre: {
          type: DataTypes.STRING,
        },
        description: {
          type: DataTypes.STRING,
        } ,
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
  
    return Blog;
  };
  