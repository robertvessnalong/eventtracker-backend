'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'uuid', as: 'user' });
    }

    toJSON() {
      return { ...this.get() };
    }
  }
  Favorite.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      performerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      performerName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      performerImage: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      performerUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      eventName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      eventDate: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      eventAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      eventExtendedAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      eventUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'favorites',
      modelName: 'Favorite',
    }
  );
  return Favorite;
};
