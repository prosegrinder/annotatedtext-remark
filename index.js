"use strict";

var annotatedtext = require("annotatedtext");
var unified = require("unified");
var remarkparse = require("remark-parse");
var frontmatter = require("remark-frontmatter");

const defaults = {
  children(node) {
    return annotatedtext.defaults.children(node);
  },
  annotatetextnode(node) {
    return annotatedtext.defaults.annotatetextnode(node);
  },
  interpretmarkup(text = "") {
    let count = (text.match(/\n/g) || []).length;
    return "\n".repeat(count);
  },
  remarkoptions: {
    commonmark: true
  }
};

function build(text, options = defaults) {
  const processor = unified()
    .use(remarkparse, options.remarkoptions)
    .use(frontmatter, ["yaml","toml"]);
  return annotatedtext.build(text, processor.parse, options);
}

module.exports = {
  defaults,
  build
};
