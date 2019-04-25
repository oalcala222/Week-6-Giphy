// We first set our API key into a variable
var APIkey = "KIwig8hYWQ0LnH3dlIJNRtn33176aIjw";
console.log(APIkey);
//Creating an array of initial cartoons
var funnyCartoons = ["The Simpsons", "Family Guy", "Big Mouth", "F is for Family", "BoJack Horseman", "Archer", "Tom and Jerry", "SpongeBob Squarepants", "Rick and Morty"];

//We then render the initial buttons to display the GIF's
function cartoonButtons() {
  // Delete the intial movie button so we wont have repitition
  $("#buttons-dump").empty();
  // We loop through the array of funnyCartoons
  for (var i = 0; i < funnyCartoons.length; i++) {
    //Then we dynamically genarate buttons for each funny cartoon in the initial array
    var fCButtons = $("<button>");
    fCButtons.attr({
      "class": "cartoon-Button",
      "data-name": funnyCartoons[i],
    });
    fCButtons.text(funnyCartoons[i]);
    //Finally we add our dynamically generated buttons to the HTML page
    $("#buttons-dump").append(fCButtons);
  }
};
console.log(cartoonButtons)
cartoonButtons();

function displayCartoons() {
  var searchButton = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchButton + "&api_key=" + APIkey + "&limit=10";
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
};


// This .on("click") function will trigger the AJAX Call
$("#add-cartoon").on("click", function (event) {
  event.preventDefault();
  //we grab the input from the text box
  var searchButton = $("#cartoon-input").val().trim();
  //and then we add it to the array
  funnyCartoons.push(searchButton);
  console.log(funnyCartoons);
  //lastly, we call the cartoonButtons function which continues to add and process the buttons
  cartoonButtons();
});

$(document).on("click",".cartoon-Button",displayCartoons);


// Calling the renderButtons function to display the initial buttons
cartoonButtons();






















//first we need to initailize the giphy api
//we also need to create an variable with  array that will contain all

//you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.





/*1. **Hit the GIPHY API**.
   * Fool around with the GIPHY API. [Giphy API](https://developers.giphy.com/docs/).
   * Be sure to read about these GIPHY parameters (hint, hint):
     * `q`
     * `limit`
     * `rating`
   * Like many APIs, GIPHY requires developers to use a key to access their API data. To use the GIPHY API, you'll need a GIPHY account (don't worry, it's free!) and then obtain an API Key by [creating an app](https://developers.giphy.com/dashboard/?create=true).
   * Make sure you switch the protocol in the query URL from **`http to https`**, or the app may not work properly when deployed to Github Pages.

2. **[Watch the demo video](https://youtu.be/BqreERTLjgQ)**

   * You should have a high-level understanding of how this assignment works before attempting to code it.

### Submission on BCS

* Please submit both the deployed Github.io link to your homework AND the link to the Github Repository!

### Instructions

1. Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
   * We chose animals for our theme, but you can make a list to your own liking.

2. Your app should take the topics in this array and create buttons in your HTML.
   * Try using a loop that appends a button for each string in the array.

3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

5. Under every gif, display its rating (PG, G, so on).
   * This data is provided by the GIPHY API.
   * Only once you get images displaying with button presses should you move on to the next step.

6. Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.

7. Deploy your assignment to Github Pages.

8. **Rejoice**! You just made something really cool.

- - -

### Minimum Requirements

Attempt to complete homework assignment as described in instructions. If unable to complete certain portions, please pseudocode these portions to describe what remains to be completed. Adding a README.md as well as adding this homework to your portfolio are required as well and more information can be found below.

- - -

### Bonus Goals

1. Ensure your app is fully mobile responsive.

2. Allow users to request additional gifs to be added to the page.
   * Each request should ADD 10 gifs to the page, NOT overwrite the existing gifs.

3. List additional metadata (title, tags, etc) for each gif in a clean and readable format.

4. Include a 1-click download button for each gif, this should work across device types.

5. Integrate this search with additional APIs such as OMDB, or Bands in Town. Be creative and build something you are proud to showcase in your portfolio

6. Allow users to add their favorite gifs to a `favorites` section.
   * This should persist even when they select or add a new topic.
   * If you are looking for a major challenge, look into making this section persist even when the page is reloaded(via localStorage or cookies).

### Reminder: Submission on BCS

* Please submit both the deployed Github.io link to your homework AND the link to the Github Repository!

- - -

### Create a README.md

Add a `README.md` to your repository describing the project. Here are some resources for creating your `README.md`. Here are some resources to help you along the way:

* [About READMEs](https://help.github.com/articles/about-readmes/)

* [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)

- - -

### Add To Your Portfolio

After completing the homework please add the piece to your portfolio. Make sure to add a link to your updated portfolio in the comments section of your homework so the TAs can easily ensure you completed this step when they are grading the assignment. To receive an 'A' on any assignment, you must link to it from your portfolio.

- - -

### One More Thing

If you have any questions about this project or the material we have covered, please post them in the community channels in slack so that your fellow developers can help you! If you're still having trouble, you can come to office hours for assistance from your instructor and TAs.

**Good Luck!**/
