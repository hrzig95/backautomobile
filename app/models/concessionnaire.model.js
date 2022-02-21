module.exports = (sequelize, Sequelize, DataTypes) => {
    const Concessionnaire = sequelize.define(
        "concessionnaire", // Model name
        {
            // Attributes
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            tel: {
                type: DataTypes.STRING,
            },
            fax: {
                type: DataTypes.STRING,
            },
            address: {
                type: DataTypes.STRING,
            },
            type: {
                type: DataTypes.STRING,
            }
        }, {
            // Options
            timestamps: true,
            underscrored: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );

    return Concessionnaire;
};