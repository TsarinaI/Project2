require("dotenv").config();
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

  app.post("/", function(req, res) {
    console.log(JSON.stringify(req.body));
    function logToDOM(message, dest) {
      $(dest).html(message);
    }
    tokenCall();

    function tokenCall() {
      // var apiKey = "PnZY06w1n6dNWc5KJHLrSprmEkjOTubBodspYsP2MU2JDdsOLd";
      // var apiSecret = "TBM3WWHF7Z975GlxRiNI3iyyyIqmu23f6YShtcr5";
      var apiKey = process.env.API_KEY;
      var apiSecret = process.env.API_SECRET;

      var petFinderUrl = `https://api.petfinder.com/v2/oauth2/token`;
      const proxyUrl = "https://shielded-hamlet-43668.herokuapp.com/";

      $.ajax({
        type: "POST",
        url: proxyUrl + petFinderUrl,
        data: {
          grant_type: "client_credentials",
          client_id: apiKey,
          client_secret: apiSecret
        }
      })
        .done(response => {
          console.log(response);
          console.log(response.access_token);
          var bearerToken = response.access_token;

          const message = JSON.stringify(response);
          const container = document.querySelector(".with-proxy");
          logToDOM(message, container);
          apiCall(bearerToken);
        })
        .catch(error => {
          console.error(error);
          const message = JSON.stringify(error);
          const container = document.querySelector(".with-proxy");
          logToDOM(message, container);
        });
    }

    function apiCall(bearerToken) {
      var bearerToken = bearerToken;
      var petFinderUrl = `http://api.petfinder.com/v2/animals?type=dog&random`;
      const proxyUrl = "https://shielded-hamlet-43668.herokuapp.com/";

      $.ajax({
        url: proxyUrl + petFinderUrl,
        headers: {
          authorization: "Bearer " + bearerToken
        }
      })
        .done(response => {
          console.log(response);
          console.log(response.animals[0].name);
          $("#petDateName").append(JSON.stringify(response.animals[0].name));

          console.log(response.animals[0].species);
          $("#petDateSpecies").append(
            JSON.stringify(response.animals[0].species)
          );

          // console.log(response.animals[0].photos[0].medium);
          console.log(response.animals[0].url);
          $("#petfinderURL").append(JSON.stringify(response.animals[0].url));

          console.log(response.animals[0].description);
          $("#petDateDescription").append(
            JSON.stringify(response.animals[0].description)
          );

          const message = JSON.stringify(response);
          const container = document.querySelector(".with-proxy");
          logToDOM(message, container);
        })
        .catch(error => {
          console.error(error);
          const message = JSON.stringify(error);
          const container = document.querySelector(".with-proxy");
          logToDOM(message, container);
        });
    }
  });

  // Delete an example by id
  // app.delete("/api/pet/:id", function(req, res) {
  //   db.Profile.destroy({ where: { id: req.params.id } }).then(function(pet) {
  //     res.json(pet);
  //   });
  // });
};
