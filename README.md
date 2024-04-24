# annotatedtext-remark

[![Node.js CI](https://github.com/prosegrinder/annotatedtext-remark/actions/workflows/npm-ci.yaml/badge.svg)](https://github.com/prosegrinder/annotatedtext-remark/actions/workflows/npm-ci.yaml)

A lightweight JavaScript library based on
[annotatedtext](https://github.com/prosegrinder/annotatedtext),
[remark-parse](https://github.com/remarkjs/remark/tree/main/packages/remark-parse),
and [remark-frontmatter](https://github.com/remarkjs/remark-frontmatter) for
converting markdown documents into an annotated text format consumable by
LanguageTool as
[AnnotatedText](https://languagetool.org/development/api/org/languagetool/markup/AnnotatedText.html).

Front matter is now tagged as markup.

## Documentation

For details, please see
[https://www.prosegrinder.com/annotatedtext-remark](https://www.prosegrinder.com/annotatedtext-remark).

## Install

**This package is
[ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).**
Node 12+ is needed to use it, and it must be `import`ed instead of `require`d.

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install annotatedtext-remark
```

## Usage

Use `build` to convert valid Markdown into
[AnnotatedText](https://languagetool.org/development/api/org/languagetool/markup/AnnotatedText.html).

```javascript
import { build } from "annotatedtext-remark";

const text = "# Hello World\n\nThis is a paragraph.";
const annotatedtext = build(text);
const ltdata = JSON.stringify(annotatedtext);
```
