var express = require("express");
var puppeteer = require("puppeteer");
var cheerio = require("cheerio");
var router = express.Router();

router.get("/recipe", function (req, res, next) {
  console.log(req.query.url);
  const ingredients = [];
  const steps = [];

  // reference: https://www.freecodecamp.org/news/the-ultimate-guide-to-web-scraping-with-node-js-daa2027dcd3/
  // future option: cheerio has capability to load from URL

  puppeteer
    .launch()
    .then((browser) => browser.newPage())
    .then((page) => page.goto(req.query.url).then(() => page.content()))
    .then((html) => {
      const $ = cheerio.load(html);

      let ingredientItems = $("ul").find("p");
      for (let i = 0; i < ingredientItems.length; i++) {
        let nextItem = ingredientItems.eq(i);
        ingredients.push(nextItem.text());
      }

      const stepItems = $("ol").find("p");
      for (let i = 0; i < stepItems.length; i++) {
        let nextItem = stepItems.eq(i);
        steps.push(nextItem.text());
      }

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
        error: err.error,
        recipe: null,
      });
    });
});

module.exports = router;
