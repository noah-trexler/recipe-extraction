var express = require("express");
var fetch = require("node-fetch");
var cheerio = require("cheerio");
var router = express.Router();

const { ingredientSearch } = require("../utils/ingredientSearch");
const { stepSearch } = require("../utils/stepSearch");
const { extractIngredients } = require("../utils/extractIngredients");

router.get("/recipe", function (req, res, next) {
  fetch(req.query.url)
    .then((html) => html.text())
    .then((text) => {
      const $ = cheerio.load(text);

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
