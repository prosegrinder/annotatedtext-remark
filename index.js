"use strict";

var annotatedtext = require("annotatedtext");
var unified = require("unified");
var remarkparse = require("remark-parse");

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
    .use(remarkparse, options.remarkoptions);
  return annotatedtext.build(text, processor.parse, options);
}

module.exports = {
  defaults,
  build
};
