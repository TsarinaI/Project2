module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define("pet_tinder", {
    owner: DataTypes.STRING,
    petName: DataTypes.STRING,
    email: DataTypes.STRING,
    petType: DataTypes.STRING
  });
  return Profile;
};
