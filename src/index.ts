import * as annotatedtext from "annotatedtext";
import frontmatter from "remark-frontmatter";
import remarkparse from "remark-parse";
import { unified } from "unified";
import { IOptions } from "../types";

/**
 * @module annotatedtext-markdown
 * @description
 * This module provides a function to convert markdown to annotated text
 * using the remark parser.
 *
 * @example
 * import { build } from "annotatedtext-markdown";
 *
 * const text = "# Hello World\n\nThis is a paragraph.";
 * const annotatedtext = build(text);
 *
 */

/**
 * @typedef {Object} IOptions
 * @property {Function} children - Function to get the children of a node.
 * @property {Function} annotatetextnode - Function to annotate a text node.
 * @property {Function} interpretmarkup - Function to interpret markup.
 * @property {Object} remarkoptions - Options for the remark parser.
 */
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
  // See: https://github.com/syntax-tree/mdast-util-from-markdown#frommarkdowndoc-encoding-options
  remarkoptions: {},
};

/**
 * Build annotated text from markdown using the remark parser.
 * @function build
 * @param text The markdown text to convert to annotated text.
 * @param options The options to use when converting the markdown text.
 * @returns The annotated text.
 */
function build(
  text: string,
  options: IOptions = defaults,
): annotatedtext.IAnnotatedtext {
  const nodes = unified()
    .use(remarkparse, options.remarkoptions)
    .use(frontmatter, ["yaml", "toml"])
    .parse(text) as annotatedtext.INode;
  return annotatedtext.compose(text, nodes, options);
}

export { build, defaults };
