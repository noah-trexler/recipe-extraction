const rdf = require("rdf");

function parseRDF($) {
  const script = $("script[type|='application/ld+json']");
  let doc = JSON.parse(script.html());
  //   const doc = rdf.parse(json);
  if (doc[0] !== undefined) {
    doc = doc[0];
  }
  if ("@graph" in doc) {
    doc = doc["@graph"][0];
  }

  console.log(doc);
  let result = { ingredients: [], steps: [] };

  if ("recipeIngredient" in doc) {
    result.ingredients = doc.recipeIngredient;
  }

  if ("recipeInstructions" in doc) {
    Array.isArray(doc.recipeInstructions)
      ? doc.recipeInstructions.forEach((step) => result.steps.push(step.text))
      : (result.steps = doc.recipeInstructions.split("."));
  }

  return result;
}

module.exports = { parseRDF };
