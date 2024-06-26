
module.exports = (sequelize, DataTypes) => {

    const products = sequelize.define("product", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.TEXT,
        },
        published: {
            type: DataTypes.BOOLEAN,
        },

    })
    return products
}