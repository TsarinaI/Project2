// Get references to page elements
var $owner = $("#exampleInputOwner");
var $name = $("#petName");
var $email = $("#exampleInputEmail1");
// var $type = 
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveProfile: function(profile) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/profile",
      data: JSON.stringify(profile)
    });
  },
  getProfile: function() {
    return $.ajax({
      url: "api/profile",
      type: "GET"
    });
  }
  // ,
  // deleteExample: function(id) {
  //   return $.ajax({
  //     url: "api/profile/" + id,
  //     type: "DELETE"
  //   });
  // }
};

// refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(profile) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/profile/" + profile.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
//Profile inputs need ids from our html
  var profile = {
    owner: $exampleText.val().trim(),
    petName: $exampleDescription.val().trim(),
    email: //id goes here.val().trim(),
    petType: // id goes here.val().trim()
  };

  if (!(profile.owner && profile.petName && profile.email && profile.petType)) {
    alert("You left a field blank");
    return;
  }

  // API.saveExample(profile).then(function() {
  //   refreshExamples();
  // });

  $exampleText.val("");
  $exampleDescription.val("");
  //email id.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
