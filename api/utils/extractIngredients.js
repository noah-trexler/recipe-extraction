/**
 * INGREDIENT EXTRACTION
 *
 * ingredients: {
 *   ingredient: string;
 *   amount: number;
 *   amount_unit: string;
 * }[];
 *
 **/

/*
const unit_regex =
  /(tablespoons|tablespoon|tbsp|teaspoons|teaspoon|tsp|ounces|ounce|oz|fl. oz|fluid ounces|fluid ounce|cups|cup|quarts|quart|qt|pints|pint|gallons|gallon|lb|pounds|pound|liter|pinch)??/gim;

function matchReplace(str, arr1, arr2) {
  if (!arr1 && !arr2) return str;
  arr1 === null
    ? (match_arr = arr2.concat(arr1))
    : (match_arr = arr1.concat(arr2));

  for (let match of match_arr) {
    str = str.replace(match, "");
  }
  return str;
}


const nq = require("numeric-quantity");

function extractIngredients(ingredients) {
  const ingredient_list = [];
  for (let ingredient of ingredients) {
    ingredient = ingredient
      .trim()
      .replaceAll(/\([^\)]*\)/gm, "")
      .toLowerCase();
    //   .split(" ");

    let measurements = ingredient.match(/(.*)?([0-9]|¼|½)/gim);
    let units = ingredient.match(unit_regex);
    let ingredient_description = matchReplace(ingredient, measurements, units);

    let decimal_measurement = [];
    for (let m of measurements) {
      decimal_measurement.push(nq.numericQuantity(m));
    }
    console.log(decimal_measurement);

    ingredient_list.push({
      ingredient: ingredient_description,
      amount: measurements ? measurements[0] : "",
      amount_unit: units ? units[0] : "",
    });
  }
  return ingredient_list;
}
*/

// https://www.npmjs.com/package/parse-ingredient
const ParseIngredient = require("parse-ingredient");

function extractIngredients(ingredients) {
  const ingredient_list = [];
  for (let ingredient of ingredients) {
    ingredient = ingredient
      .trim()
      .replaceAll(/\([^\)]*\)/gm, "")
      .toLowerCase();

    ingredient_list.push(ParseIngredient.parseIngredient(ingredient)[0]);
  }
  return ingredient_list;
}

module.exports = { extractIngredients };
