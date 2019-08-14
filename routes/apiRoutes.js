require("dotenv").config();
var axios = require("axios");
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

  app.get("/api/petfinder", function(req, res) {
    var animals = tokenCall();
    res.json(animals);
    function tokenCall() {
      var apiKey = process.env.API_KEY;
      var apiSecret = process.env.API_SECRET;

      var petFinderUrl = `https://api.petfinder.com/v2/oauth2/token`;

      axios
        .post(petFinderUrl, {
          grant_type: "client_credentials",
          client_id: apiKey,
          client_secret: apiSecret
        })
        .then(response => {
          var bearerToken = response.data.access_token;
          return apiCall(bearerToken);
        })
        .catch(error => {
          console.error(error);
        });
    }

    function apiCall(bearerToken) {
      var petFinderUrl = `http://api.petfinder.com/v2/animals?type=dog&random`;
      axios({
        method: "get",
        url: petFinderUrl,
        headers: {
          Authorization: "Bearer " + bearerToken
        }
      })
        .then(response => {
          console.log(response.data);
          return response.data.animals;
        })
        .catch(error => {
          console.error(error);
        });
    }
  });
};
