var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/pets", function(req, res) {
    db.Pet.findAll({}).then(function(pet) {
      res.json(pet);
    });
  });

  // Create a new example
  app.post("/api/pets", function(req, res) {
    console.log(JSON.stringify(req.body));
    db.Pet.create(req.body).then(function(pet) {
      res.json(pet);
    });
  });

  // Delete an example by id
  // app.delete("/api/pet/:id", function(req, res) {
  //   db.Profile.destroy({ where: { id: req.params.id } }).then(function(pet) {
  //     res.json(pet);
  //   });
  // });
};
