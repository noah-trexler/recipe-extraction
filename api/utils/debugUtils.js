const fs = require("fs");

// Debug utilities

function logHTML($, cheerioElement) {
  try {
    let search = cheerioElement.toArray();
    let parse = search.map((s) => $.html(s));
    parse.forEach((e) => console.log(e));
  } catch (error) {}
}

function writeToFile(filePath, text) {
  fs.writeFile(filePath, text);
}

module.exports = { logHTML };
// fs.writeFile(
//   "/Users/c615786/Documents/CVS/recipe-extraction/api/utils/format.html",
//   e
// );
