'use strict';

module.exports = (sequelize, DataTypes) => sequelize.define(
  'feed',
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
    likeCount: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
  },
  {
    tableName: 'feed',
    timestamps: false,
  },
  (models) => {
    models.feed.hasMany(models.feedContents, { as: 'feedContents', foreignKey: 'feedId', targetKey: 'feedId' });
    models.feed.hasOne(models.feedLike, { as: 'feedLike', foreignKey: 'feedId', targetKey: 'feedId' });
  },
);
