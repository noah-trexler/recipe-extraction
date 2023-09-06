// Debug utilities

function logHTML($, cheerioElement) {
  let search = cheerioElement.toArray();
  let parse = search.map((s) => $.html(s));
  parse.forEach((e) => console.log(e));
}

module.exports = { logHTML };
