module.exports = (sequelize, Sequelize, DataTypes) => {
    const PictureConcessionnaire = sequelize.define(
        "picturecConcessionnaire", // Model name
        {
            // Attributes
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            picture: {
                type: DataTypes.TEXT('long'),
            }
        }, {
            // Options
            timestamps: true,
            underscrored: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );

    return PictureConcessionnaire;
};