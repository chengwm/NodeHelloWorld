module.exports.generateModel = function(db){
  let DataTypes = db.Sequelize;
  let model = db.define('VDModel', {
    key: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    timestamps: true,
    updatedAt: false,
    indexes: [{fields: ['key']}]
  })

  return model;
}