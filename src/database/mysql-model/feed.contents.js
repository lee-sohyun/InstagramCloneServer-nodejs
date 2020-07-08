'use strict';

module.exports = (sequelize, DataTypes) => sequelize.define(
  'feed_contents',
  {
    contentId: {
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
    feedContent: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },

    date: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
  },
  {
    tableName: 'feed_contents',
    timestamps: false,
  },
  (models) => {
    models.feedContents.belongsTo(models.feed, { as: 'feedContents', foreignKey: 'feedId', targetKey: 'feedId' });
  },
);
