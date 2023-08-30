/**
 * DOM TRAVERSING ALGORITHM
 *
 * Ingredients Section
 * - Search for header with text content 'ingredients'
 * - Traverse up the DOM until an element containing <ul> is found
 * - Extract the text contents of the <ul>
 */

function ingredientSearch($) {
  const ingredients = [];
  $(":is(h1,h2,h3,h4,h5,h6):contains('Ingredients')")
    .closest(':contains("ul")')
    .find("ul")
    .find("li")
    .each(function (i, elem) {
      let str = $(this).prop("innerText");
      ingredients[i] = str.replaceAll(/(<(.|\n)*>|▢)/gm, ""); // RegEx to replace any lingering html tags
    });
  return ingredients;
}

module.exports = { ingredientSearch };
