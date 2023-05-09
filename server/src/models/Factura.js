const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Factura", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo_factura: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
