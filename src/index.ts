import * as annotatedtext from "annotatedtext";
import frontmatter from "remark-frontmatter";
import remarkparse from "remark-parse";
import { unified } from "unified";
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
  // See: https://github.com/syntax-tree/mdast-util-from-markdown#frommarkdowndoc-encoding-options
  remarkoptions: {},
};

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
