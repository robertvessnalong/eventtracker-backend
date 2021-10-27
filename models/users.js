'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require('../config');
const { userInfo } = require('os');
const { nextTick } = require('process');
const { UnauthorizedError, NotFoundError } = require('../expressError');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Comment, Favorite }) {
      // define association here
      this.hasMany(Comment, { foreignKey: 'uuid', as: 'comments' });
      this.hasMany(Favorite, { foreignKey: 'uuid', as: 'favorites' });
    }

    toJSON() {
      return { ...this.get(), id: undefined, password: undefined };
    }
  }
  Users.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'An account already exists with this email',
        },
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 8,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
    }
  );
  Users.addHook('beforeUpdate', async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, BCRYPT_WORK_FACTOR);
    }
  });

  Users.addHook('beforeCreate', async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, BCRYPT_WORK_FACTOR);
    }
  });

  Users.authenticate = async (email, password) => {
    let user;
    try {
      user = await await Users.findOne({
        where: { email: email },
        include: [{ all: true, nested: true }],
      });
    } catch {
      throw new NotFoundError('User Not Found');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid === true) {
      delete user.password;
      return user;
    }

    throw new UnauthorizedError('Invalid username/password');
  };

  Users.validPassword = async (id, password) => {
    let user;
    try {
      user = await (
        await Users.findOne({ where: { uuid: id } })
      ).get({
        plain: true,
      });
    } catch {
      throw new NotFoundError('User Not Found');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid === true) {
      return true;
    }

    throw new UnauthorizedError('Invalid password');
  };

  return Users;
};
