$(document).ready(function() {
  // Lines 3-4 are for index.html multiple select
  //   $('.mdb-select').materialSelect();
  //   });

  // Get references to page elements
  var $owner = $("#petInputOwner");
  var $name = $("#petName");
  var $email = $("#petInputEmail1");
  var $type = $("#petType");
  var $submitBtn = $("#submit");
  // var $petList = $("#pet-list");
  var $profiles = $("#allpro");

  // The API object contains methods for each kind of request we'll make
  var API = {
    savePet: function(pet) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/pets",
        data: JSON.stringify(pet)
      });
    },
    getPet: function() {
      return $.ajax({
        url: "api/pets",
        type: "GET"
      });
    }
    // ,
    // deletePet: function(id) {
    //   return $.ajax({
    //     url: "api/pet/" + id,
    //     type: "DELETE"
    //   });
    // }
  };


    var $table = $("<table>").addClass("table");
  $table
    // thead
    .append("<thead>")
    .children("thead")
    .append("<tr />")
    .children("tr")
    .append(
      "<th>Pet Owner</th><th>Pet Name</th><th>Pet Type</th>"
    );

  $table.appendTo("#profiles");

  // refreshPets gets new pets from the db and repopulates the list
  var refreshPets = function() {
    API.getPet().then(function(data) {
      // var viewAll = $("#profiles");
      var $pets = data.map(function(pet) {
        //tbody
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
      viewAll.prepend($pets);
    });
  };

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  // handleFormSubmit is called whenever we submit a new pet
  // Save the new pet to the db and refresh the list
  var handleFormSubmit = function(event) {
    event.preventDefault();
    console.log("click");
    //Profile inputs need ids from our html
    var pet = {
      owner: capitalize($owner.val().trim()),
      petName: capitalize($name.val().trim()),
      email: $email.val().trim(),
      petType: $type.val().trim()
    };

    if (!(pet.owner && pet.petName && pet.email)) {
      alert("You left a field blank");
      return;
    }
    console.log(pet);
    API.savePet(pet).then(function() {
      refreshPets();
    });

    $owner.val("");
    $name.val("");
    $email.val("");
    // $("#emptydiv").empty();
  };

  // handleDeleteBtnClick is called when an pet's delete button is clicked
  // Remove the pet from the db and refresh the list
  // var handleDeleteBtnClick = function() {
  //   var idToDelete = $(this)
  //     .parent()
  //     .attr("data-id");

  //   API.deletePet(idToDelete).then(function() {
  //     refreshPets();
  //   });
  // };

  // Add event listeners to the submit and delete buttons
  $submitBtn.on("click", handleFormSubmit);
  $profiles.on("click", refreshPets);
  // $petList.on("click", ".delete", handleDeleteBtnClick);
  $("#userPetTypes .dropdown-item").on("click", function() {
    $("#petType").val($(this).text());
    $("#userPetType").text($(this).text());
  });
});
