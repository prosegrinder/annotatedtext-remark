import type { INode, IAnnotation, IAnnotatedtext } from "annotatedtext";
import type { Options } from "remark-parse";

export interface IOptions {
  remarkoptions: Options;
  children(node: INode): INode[];
  annotatetextnode(node: INode, text: string): IAnnotation | null;
  interpretmarkup(text?: string): string;
}

export const defaults: IOptions;

export function collecttextnodes(
  ast: unknown,
  text: string,
  options?: IOptions,
): IAnnotation[];

export function composeannotation(
  text: string,
  annotatedtextnodes: IAnnotatedtext,
  options?: IOptions,
): IAnnotatedtext;

export function build(
  text: string,
  parse: unknown,
  options?: IOptions,
): IAnnotatedtext;
