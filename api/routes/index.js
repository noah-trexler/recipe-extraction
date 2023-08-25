var express = require("express");
var puppeteer = require("puppeteer");
var cheerio = require("cheerio");
var router = express.Router();

router.get("/recipe", function (req, res, next) {
  console.log(req.query.url);
  const ingredients = [];
  const steps = ["test item"];

  // reference: https://www.freecodecamp.org/news/the-ultimate-guide-to-web-scraping-with-node-js-daa2027dcd3/
  // future option: cheerio has capability to load from URL
  puppeteer
    .launch()
    .then((browser) => browser.newPage())
    .then((page) => page.goto(req.query.url).then(() => page.content()))
    .then((html) => {
      const $ = cheerio.load(html);
      const listItems = $("ul").children("li");
      console.log(listItems[4].children);
      res.status(200).json({
        message: "Successfully retrieved recipe.",
        recipe: {
          url: req.query.url,
          html: listItems,
          ingredients: ingredients,
          steps: steps,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Could not retrieve recipe.",
        error: err,
        recipe: null,
      });
    });
});

module.exports = router;
