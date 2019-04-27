// We first set our API key into a variable
var APIkey = "KIwig8hYWQ0LnH3dlIJNRtn33176aIjw";

//Creating an array of initial cartoons
var funnyCartoons = ["The Simpsons", "Family Guy", "Big Mouth", "F is for Family", "BoJack Horseman", "Archer", "Tom and Jerry", "SpongeBob Squarepants", "Rick and Morty"];
console.log

//We then render the initial buttons to display the GIF's
function cartoonButtons() {
  // Delete the intial movie button so we wont have repitition
  $("#buttons-dump").empty();
  // We loop through the array of funnyCartoons
  for (var i = 0; i < funnyCartoons.length; i++) {
    //Then we dynamically genarate buttons for each funny cartoon in the initial array
    var fCButtons = $("<button>");
    fCButtons.attr({
      "class": "cartoon-Button btn btn-secondary active",
      "data-name": funnyCartoons[i],
    });
    fCButtons.text(funnyCartoons[i]);
    //Finally we add our dynamically generated buttons to the HTML page
    $("#buttons-dump").append(fCButtons);
    console.log(fCButtons);
  };
};

// This .on("click") function will trigger the AJAX Call
$("#add-cartoon").on("click", function (event) {
  event.preventDefault();
  //we grab the input from the text box
  var gifs = $("#cartoon-input").val().trim();
  $("#gif-form").trigger("reset");
  //and then we add it to the array
  funnyCartoons.push(gifs);
  console.log(funnyCartoons);
  //we call the cartoonButtons function which continues to add and process the buttons
  cartoonButtons();
});

//lastly, we call the cartoonButtons function again to display the initial buttons
cartoonButtons();

function displayCartoons() {
  $("#gifs-appear-here").empty();
  //$("button").on("click", function() {
  var gifs = $(this).attr("data-name");
  console.log(this);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=" + APIkey + "&limit=10";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(queryURL);
    console.log(response);
    // storing the data from the AJAX request in the results variable
    var results = response.data;
    // Looping through each result item
    for (var i = 0; i < results.length; i++) {
      // Creating and storing a div tag
      var cartoonDiv = $("<div>");
      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + results[i].rating);
      // Creating and storing an image tag
      var cartoonGIF = $("<img>");
      // Setting the src attribute of the image to a property pulled off the result item
      cartoonGIF.attr("src", results[i].images.fixed_height.url);
      // Appending the paragraph and image tag to the cartoonDiv
      cartoonDiv.append(p);
      cartoonDiv.append(cartoonGIF);
      // Prependng the cartoonlDiv to the HTML page in the "#gifs-appear-here" div
      $("#gifs-appear-here").prepend(cartoonDiv);
    }
  }); 
//});
};
$(document).on("click",".cartoon-Button",displayCartoons);