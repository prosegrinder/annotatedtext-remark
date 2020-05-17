import * as annotatedtext from "annotatedtext";

declare namespace annotatedtextremark {

  export interface IOptions {
    remarkoptions: any;
    children(node: any): any;
    annotatetextnode(node: any, text: string): annotatedtext.IAnnotation | null;
    interpretmarkup(text?: string): string;
  }

  export const defaults: IOptions;

  export function collecttextnodes(
    ast: any,
    text: string,
    options?: IOptions,
  ): any[];

  export function composeannotation(
    text: string,
    annotatedtextnodes: annotatedtext.IAnnotatedtext,
    options?: IOptions,
  ): annotatedtext.IAnnotatedtext;

  export function build(
    text: string,
    parse: any,
    options?: IOptions,
  ): annotatedtext.IAnnotatedtext;
}

export = annotatedtextremark;
