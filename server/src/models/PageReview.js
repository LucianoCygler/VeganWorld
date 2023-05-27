const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "PageReview",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      cliente_nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cliente_imagen: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue:
          "https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-default-male-avatar-png-image_2811083.jpg", // Reemplaza 'URL_POR_DEFECTO' por la URL deseada
        validate: {
          isUrl: true,
        },
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      paranoid: true,
    }
  );
};
