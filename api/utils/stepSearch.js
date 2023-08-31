/**
 * DOM TRAVERSING ALGORITHM
 *
 * Recipe Section
 * - Search for header with text content 'instructions' 'method' 'recipe' 'steps'
 * - Traverse up the DOM until an element containing <ol> is found
 * - Extract the text contents of the <ol>
 */

// Current issue is that for some websites the contains finds the parent which includes an id or class including the recipe title
// Fix is to search for the innertext of the header to find

function stepSearch($) {
  const steps = [];

  // Construct the search terms for traversing DOM
  const headerTag = ":is(h1,h2,h3,h4,h5,h6):contains";
  const recipeTitle = [
    "Method",
    "Instructions",
    "Directions",
    "Preparation",
    "Recipe",
    "Technique",
    "Procedure",
    "Process",
    "Steps",
  ];

  for (let title of recipeTitle) {
    let searchString = headerTag + `('${title}')`;
    const header = $(searchString);
    if (header.length > 0) {
      header
        .closest(':contains("ol")')
        .find("ol,ul")
        .find("li")
        .each(function (i, elem) {
          let str = $(this).prop("innerText");
          steps[i] = str.replaceAll(/<(.|\n)*>/gm, "");
        });
      return steps;
    }
  }
}

module.exports = { stepSearch };
