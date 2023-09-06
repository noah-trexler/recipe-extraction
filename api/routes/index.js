var express = require("express");
var fetch = require("node-fetch");
var cheerio = require("cheerio");
var router = express.Router();

const { ingredientSearch } = require("../utils/ingredientSearch");
const { stepSearch } = require("../utils/stepSearch");
const { extractIngredients } = require("../utils/extractIngredients");
const { parseRDF } = require("../utils/parseRDF");

router.get("/recipe", function (req, res, next) {
  fetch(req.query.url)
    .then((html) => html.text())
    .then((text) => {
      const $ = cheerio.load(text);

      const rdf = parseRDF($);

      if (rdf.ingredients && rdf.steps) {
        const ingredients = extractIngredients(rdf.ingredients);
        res.status(200).json({
          message: "Successfully retrieved recipe (RDF).",
          recipe: {
            url: req.query.url,
            ingredients: ingredients,
            steps: rdf.steps,
          },
        });
      } else {
        const ingredient_list = ingredientSearch($);
        const steps = stepSearch($);
        const ingredients = extractIngredients(ingredient_list);

        res.status(200).json({
          message: "Successfully retrieved recipe.",
          recipe: {
            url: req.query.url,
            ingredients: ingredients,
            steps: steps,
          },
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Could not retrieve recipe.",
        recipe: null,
      });
    });
});

module.exports = router;
