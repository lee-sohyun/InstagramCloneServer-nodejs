'use strict';

module.exports = (sequelize, DataTypes) => sequelize.define(
  'feed_like',
  {
    likeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
    },
    feedId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    isLike: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    date: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
  },
  {
    tableName: 'feed_like',
    timestamps: false,
  },
  (models) => {
    models.feedLike.belongsTo(models.feed, { as: 'feedLike', foreignKey: 'feedId', targetKey: 'feedId' });
  },
);
