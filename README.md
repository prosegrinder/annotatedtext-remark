# annotatedtext-remark

[![Build Status](https://travis-ci.org/prosegrinder/annotatedtext-remark.svg?branch=master)](https://travis-ci.org/prosegrinder/annotatedtext-remark)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/3aba5f7e370c4ca6973938158b120b26)](https://www.codacy.com/app/ProseGrinder/annotatedtext-remark?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=prosegrinder/annotatedtext-remark&amp;utm_campaign=Badge_Grade)

A lightweight JavaScript library based on [annotatedtext](https://github.com/prosegrinder/annotatedtext), [remark-parse](https://github.com/remarkjs/remark/tree/master/packages/remark-parse), and [remark-frontmatter](https://github.com/remarkjs/remark-frontmatter) for converting markdown documents into an annotated text format consumable by LanguageTool as [AnnotatedText](https://languagetool.org/development/api/org/languagetool/markup/AnnotatedText.html).

Front matter is now tagged as markup.

## Usage

### `build(text, parse, options = defaults)`

Returns Annotated Text as described by LanguageTool's API:

```json
{"annotation":[
 {"text": "A "},
 {"markup": "<b>"},
 {"text": "test"},
 {"markup": "</b>"}
]}
```

Run the object through `JSON.stringfy()` to get a string suitable
for passing to LanguageTool's `data` parameter.

```js
"use strict";

var builder = require("annotatedtext-remark");

const annotatedtext = builder.build(text);
var ltdata = JSON.stringify(annotatedtext);
```

* `text`: The text from the markup document in its original form.
* _`options`_: (optional) See [`defaults`](#defaults).

### `defaults`

`annotatedtext-remark` uses following default functions used throughout.

```js
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
      interpretation = text.replace(/`/g,"'");
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
```

Functions can be overriden by making a copy and assigning a new function. For
example, the tests use markdown and need to interpret new lines in the markup
as new lines. The interpretmarkup function is overriden as:

```js
var options = builder.defaults;
options.interpretmarkup = function (text) {
  let count = (text.match(/\n/g) || []).length;
  return "\n".repeat(count);
}
```

#### `children(node)`

Expected to return an array of child nodes.

#### `annotatetextnode(node)`

Expected to return a struture for a text ast node with at least the following:

* `text` is the natural language text from the node, devoid of all markup.
* `offset` contains offsets used to extract markup text from the original document.
  * `start` is the offset start of the text
  * `end` is the offset end of the text

```json
{
  "text": "A snippet of the natural language text from the document.",
  "offset": {
    "start": 1,
    "end": 57
  }
}
```

If the node is not a text node, it must return `null`;

#### `interpretmarkup(node)`

Used to make sure LanguageTool knows when markup represents some form of whitespace.

## License

[MIT](LICENSE) © David L. Day
