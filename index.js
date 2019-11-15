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
    let interpretation = "";
    // Treat inline code as text
    if (text.match(/^(?!\s*`{3})\s*`{1,2}/)) {
      // Replace with single quotes to avoid tiggering EN_QUOTES
      interpretation = text.replace(/`/g,"'")
    } else {
      let count = (text.match(/\n/g) || []).length;
      interpretation = "\n".repeat(count);
    }
    return interpretation;
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
