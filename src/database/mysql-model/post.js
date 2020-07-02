'use strict';

module.exports = (sequelize, DataTypes) => sequelize.define(
  'post',
  {
    feedId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    userName: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    userProfileImage: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    feedText: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    feedContents: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    likeCount: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    isScrap: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isLike: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    date: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
  },
  {
    tableName: 'post',
    timestamps: false,
  },
);
