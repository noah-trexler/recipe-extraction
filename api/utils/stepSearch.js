/**
 * DOM TRAVERSING ALGORITHM
 *
 * Recipe Section
 * - Search for header with text content 'instructions' 'method' 'recipe' 'steps'
 * - Traverse up the DOM until an element containing <ol> is found
 * - Extract the text contents of the <ol>
 */

// const { logHTML } = require("./debugUtils");

/**
 * moveUpDOM takes an element and moves upwards until the selection contains <ol> or <ul>
 * @param {*} $ The element to start at within the DOM
 * @returns The list of <li> elements in the nearest <ol> or <ul>
 */
function moveUpDOM($) {
  let resultEl = $;
  while (resultEl.find("ol,ul").length === 0) {
    resultEl = resultEl.parent();
  }
  return resultEl.find("li");
}

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
    let header = $(searchString);
    if (header.length > 0) {
      header = moveUpDOM(header);

      // Extract the text from each step
      header.each(function (i, elem) {
        let str = $(this).prop("innerText");
        steps[i] = str.replaceAll(/<(.|\n)*>/gm, "");
      });
      return steps;
    }
  }
}

module.exports = { stepSearch };
