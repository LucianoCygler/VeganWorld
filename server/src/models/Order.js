const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pendiente",
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },

      importe: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "Orders", // Agrega esta propiedad
    }
  );
};
