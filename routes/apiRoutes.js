var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/profile", function(req, res) {
    db.Profile.findAll({}).then(function(pet) {
      res.json(pet);
    });
  });

  // Create a new example
  app.post("/api/profile", function(req, res) {
    db.Profile.create(req.body).then(function(pet) {
      res.json(pet);
    });
  });

  // Delete an example by id
  // app.delete("/api/profile/:id", function(req, res) {
  //   db.Profile.destroy({ where: { id: req.params.id } }).then(function(pet) {
  //     res.json(pet);
  //   });
  // });
};
