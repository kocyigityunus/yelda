/* jshint node: true */
"use strict";

/**
 * type : 1 --> markddown
 * type : 2 --> raw html
 */
module.exports = function(sequelize, DataTypes) {
  var BlogPost = sequelize.define("BlogPost", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    type : {
      type : DataTypes.INTEGER,
      allowNull : false,
    },
    markdown : {
      type : DataTypes.STRING(20000),
    },
    rawHtml : {
      type : DataTypes.STRING(20000),
    },
  },{
    classMethods : {
        associate : function(models){
            BlogPost.hasMany( models.BlogPostVersion , {
                as : 'versions',
                foreignKey : 'blogPostId'
            });
        },
    },
    instanceMethods : {
      toJSON: function () {
        var values = this.get();
        return values;
      }
    },
    freezeTableName: true
  });

return BlogPost;
};
