$(document).ready(function() {
  API = {
    getUsers: function() {
      return $.ajax({
        url: "/users",
        type: "GET"
      });
    },
    getPet: function() {
      return $.ajax({
        url: "api/pets",
        type: "GET"
      });
    }
  };
  //   var $profiles = $("#allpro");
  var $table = $("<table>").addClass("table");
  $table
    // thead
    .append("<thead>")
    .children("thead")
    .append("<tr />")
    .children("tr")
    .append("<th>Pet Owner</th><th>Pet Name</th><th>Pet Type</th>");
  $table.appendTo("#profiles");
  var goUsers = function() {
    API.getPet().then(function(data) {
      var viewAll = $("#profiles");
      var $pets = data.map(function(pet) {
        var $tbody = $table.append("<tbody />").children("tbody");
        // add row
        $tbody
          .append("<tr />")
          .children("tr:last")
          .append("<td>" + pet.owner + "</td>")
          .append("<td>" + pet.petName + "</td>")
          .append("<td>" + pet.petType + "</td>");
      });
      // $petList.empty();
      viewAll.append($pets);
    });
  };
  goUsers();
  //   $profiles.on("click", goUsers);
});
