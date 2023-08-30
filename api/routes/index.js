var express = require("express");
var puppeteer = require("puppeteer");
var cheerio = require("cheerio");
var router = express.Router();

router.get("/recipe", function (req, res, next) {
  console.log(req.query.url);
  const ingredients = [];
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
  ];
  let searchString = "";
  for (let title of recipeTitle) {
    searchString = searchString + (headerTag + `('${title}'),\n`);
  }

  // reference: https://www.freecodecamp.org/news/the-ultimate-guide-to-web-scraping-with-node-js-daa2027dcd3/
  puppeteer
    .launch()
    .then((browser) => browser.newPage())
    .then((page) =>
      page
        .goto(req.query.url, { waitUntil: "load", timeout: 0 })
        .then(() => page.content())
    )
    .then((html) => {
      const $ = cheerio.load(html);

      $(":is(h1,h2,h3,h4,h5,h6):contains('Ingredients')")
        .closest(':contains("ul")')
        .find("ul,ol")
        .find("li")
        .each(function (i, elem) {
          let str = $(this).prop("innerText");
          ingredients[i] = str.replaceAll(/<(.|\n)*>/gm, ""); // RegEx to replace any lingering html tags
        });

      $(`:is(h1,h2,h3,h4,h5,h6):contains('Method'),
         :is(h1,h2,h3,h4,h5,h6):contains('Instructions'),
         :is(h1,h2,h3,h4,h5,h6):contains('Directions'),
         :is(h1,h2,h3,h4,h5,h6):contains('Preparation')`)
        .closest(':contains("ol")')
        .find("ol,ul")
        .find("li")
        .each(function (i, elem) {
          let str = $(this).prop("innerText");
          steps[i] = str.replaceAll(/<(.|\n)*>/gm, "");
        });

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

/**
 * DOM TRAVERSING ALGORITHM
 *
 * Ingredients Section
 * - Search for header with text content 'ingredients'
 * - Traverse up the DOM until an element containing <ul> is found
 * - Extract the text contents of the <ul>
 *
 * Recipe Section
 * - Search for header with text content 'instructions' 'method' 'recipe' 'steps'
 * - Traverse up the DOM until an element containing <ol> is found
 * - Extract the text contents of the <ol>
 */
