import * as annotatedtext from "annotatedtext";
import * as remarkparse from "remark-parse";

declare namespace annotatedtextremark {
  export interface IOptions {
    remarkoptions: remarkparse.RemarkParseOptions;
    children(node: annotatedtext.INode): annotatedtext.INode[];
    annotatetextnode(
      node: annotatedtext.INode,
      text: string,
    ): annotatedtext.IAnnotation | null;
    interpretmarkup(text?: string): string;
  }

  export const defaults: IOptions;

  export function collecttextnodes(
    ast: unknown,
    text: string,
    options?: IOptions,
  ): annotatedtext.IAnnotation[];

  export function composeannotation(
    text: string,
    annotatedtextnodes: annotatedtext.IAnnotatedtext,
    options?: IOptions,
  ): annotatedtext.IAnnotatedtext;

  export function build(
    text: string,
    parse: unknown,
    options?: IOptions,
  ): annotatedtext.IAnnotatedtext;
}

export = annotatedtextremark;
