var express = require("express");
var puppeteer = require("puppeteer");
var cheerio = require("cheerio");
var router = express.Router();

const { ingredientSearch } = require("../utils/ingredientSearch");
const { stepSearch } = require("../utils/stepSearch");
const { extractIngredients } = require("../utils/extractIngredients");

router.get("/recipe", function (req, res, next) {
  // reference: https://www.freecodecamp.org/news/the-ultimate-guide-to-web-scraping-with-node-js-daa2027dcd3/
  puppeteer
    .launch({ headless: "new" })
    .then((browser) => browser.newPage())
    .then((page) =>
      page
        .goto(req.query.url, { waitUntil: "load", timeout: 0 })
        .then(() => page.content())
    )
    .then((html) => {
      const $ = cheerio.load(html);

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
