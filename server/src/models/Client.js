const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Client",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contraseña: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ciudad: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      edad: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dni: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imagen: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue:
          "https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-default-male-avatar-png-image_2811083.jpg", // Reemplaza 'URL_POR_DEFECTO' por la URL deseada
        validate: {
          isUrl: true,
        },
        public_id: String,
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
