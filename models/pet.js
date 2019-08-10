module.exports = function(sequelize, DataTypes) {
  var Pet = sequelize.define("Pet", {
    owner: DataTypes.STRING,
    petName: DataTypes.STRING,
    email: DataTypes.STRING,
    petType: DataTypes.STRING
  });
  return Pet;
};
