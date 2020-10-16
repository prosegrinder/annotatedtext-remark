import * as annotatedtext from "annotatedtext";
import * as frontmatter from "remark-frontmatter";
import * as remarkparse from "remark-parse";
import * as unified from "unified";
import { IOptions } from "../types";

const defaults = {
  children(node: annotatedtext.INode): annotatedtext.INode[] {
    return annotatedtext.defaults.children(node);
  },
  annotatetextnode(
    node: annotatedtext.INode,
    text: string,
  ): annotatedtext.IAnnotation | null {
    return annotatedtext.defaults.annotatetextnode(node, text);
  },
  interpretmarkup(text = ""): string {
    return "\n".repeat((text.match(/\n/g) || []).length);
  },
  // Defaults from remark-parse
  remarkoptions: {
    blocks: [
      "address",
      "article",
      "aside",
      "base",
      "basefont",
      "blockquote",
      "body",
      "caption",
      "center",
      "col",
      "colgroup",
      "dd",
      "details",
      "dialog",
      "dir",
      "div",
      "dl",
      "dt",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "frame",
      "frameset",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "head",
      "header",
      "hgroup",
      "hr",
      "html",
      "iframe",
      "legend",
      "li",
      "link",
      "main",
      "menu",
      "menuitem",
      "meta",
      "nav",
      "noframes",
      "ol",
      "optgroup",
      "option",
      "p",
      "param",
      "pre",
      "section",
      "source",
      "title",
      "summary",
      "table",
      "tbody",
      "td",
      "tfoot",
      "th",
      "thead",
      "title",
      "tr",
      "track",
      "ul",
    ],
    commonmark: false,
    emitParseErrors: false,
    gfm: true,
    pedantic: false,
  },
};

function build(
  text: string,
  options: IOptions = defaults,
): annotatedtext.IAnnotatedtext {
  const processor = unified()
    .use(remarkparse, options.remarkoptions)
    .use(frontmatter, ["yaml", "toml"]);
  return annotatedtext.build(text, processor.parse, options);
}

export { build, defaults };
