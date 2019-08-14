// With a little help from Sequelize activty 13
// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "..public/index.html"));
  });

  app.get("/users", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/database.html"));
  });

};
