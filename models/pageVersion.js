/* jshint node: true */
"use strict";

module.exports = function(sequelize, DataTypes) {
  var PageVersion = sequelize.define("PageVersion", {
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
            PageVersion.belongsTo( models.Page,{
                as : 'page',
                foreignKey : 'pageId'
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

return PageVersion;
};
