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
            title: {
                type: DataTypes.STRING,
            },
            availablity: {
                type: DataTypes.STRING,
            },
            phone: {
                type: DataTypes.STRING,
            },
            city: {
                type: DataTypes.STRING,
            },
            brand: {
                type: DataTypes.STRING,
            },
            voitureOption: {
                type: DataTypes.JSON,
            },
            type: {
                type: DataTypes.STRING,
            },
            price: {
                type: DataTypes.DOUBLE,
            },
            color: {
                type: DataTypes.STRING,
            },
            carrosserie: {
                type: DataTypes.STRING,
            },
            guarantee: {
                type: DataTypes.STRING,
            },
            year: {
                type: DataTypes.INTEGER,
            },
            category: {
                type: DataTypes.STRING,
            },
            address: {
                type: DataTypes.STRING,
            },
            motorization: {
                type: DataTypes.STRING,
            },
            mileage: {
                type: DataTypes.STRING,
            },
            energy: {
                type: DataTypes.STRING,
            },
            transmission: {
                type: DataTypes.STRING,
            },
            powerFiscal: {
                type: DataTypes.STRING,
            },
            gearbox: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.STRING,
            },
            status: {
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

    return Voiture;
};