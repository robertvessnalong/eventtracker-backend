'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('favorites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      performerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      performerName: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      performerImage: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      performerUrl: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      eventId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      eventName: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      eventDate: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      eventAddress: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      eventExtendedAddress: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      eventUrl: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('favorites');
  },
};
