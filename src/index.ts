import * as annotatedtext from "annotatedtext";
import * as frontmatter from "remark-frontmatter";
import * as remarkparse from "remark-parse";
import * as unified from "unified";
import { IOptions } from "../types";

const defaults = {
  children(node: annotatedtext.INode) {
    return annotatedtext.defaults.children(node);
  },
  annotatetextnode(node: annotatedtext.INode, text: string) {
    return annotatedtext.defaults.annotatetextnode(node, text);
  },
  interpretmarkup(text: string = "") {
    const countP = (text.match(/\<\/p>/g) || []).length;
    const countH = (text.match(/\<\/h\d+>/g) || []).length;
    const countBr = (text.match(/\<br[\s\/]*>/g) || []).length;
    const coungNl = (text.match(/\n/g) || []).length;
    return "\n".repeat(2 * countP + 2 * countH + countBr + coungNl);
  },
  remarkoptions: {
    emitParseErrors: false,
  },
};

function build(text: string, options: IOptions = defaults) {
  const processor = unified()
    .use(remarkparse, options.remarkoptions)
    .use(frontmatter, ["yaml","toml"]);
  return annotatedtext.build(text, processor.parse, options);
}

export {
  build,
  defaults,
};
