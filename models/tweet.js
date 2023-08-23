'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Tweet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tweet.belongsTo(models.User, { foreignKey: 'UserId' })
      Tweet.hasMany(models.Reply, { foreignKey: 'TweetId' })
      Tweet.belongsToMany(models.User, {
        through: models.Like,
        as: "LikedUsers",
        foreignKey: "TweetId",
      });

    }
  };
  Tweet.init({
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Tweet',
    tableName: 'Tweets'
    // underscored: true
  })
  return Tweet
}
