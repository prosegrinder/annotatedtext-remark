/**
 * @module annotatedtext-markdown
 * @example
 * import { build } from "annotatedtext-markdown";
 *
 * const text = "# Hello World\n\nThis is a paragraph.";
 * const annotatedtext = build(text);
 * const ltdata = JSON.stringify(annotatedtext);
 *
 * @description
 * This module provides a function to build an annotated text object from
 * markdown text.
 */

import type { INode, IAnnotation, IAnnotatedtext } from "annotatedtext";
import type { Options } from "remark-parse";

/**
 * @interface IOptions
 * @property {function} children - Function to get the children of a node.
 * @property {function} annotatetextnode - Function to annotate a text node.
 * @property {function} interpretmarkup - Function to interpret markup.
 * @property {Object} remarkoptions - Options for the remark parser.
 */
export interface IOptions {
  remarkoptions: Options;
  children(node: INode): INode[];
  annotatetextnode(node: INode, text: string): IAnnotation | null;
  interpretmarkup(text?: string): string;
}

/**
 * Default options for building annotated text.
 * @constant defaults
 * @type {IOptions}
 *
 * @property {function} children - Function to get the children of a node.
 * @property {function} annotatetextnode - Function to annotate a text node.
 * @property {function} interpretmarkup - Function to interpret markup.
 * @property {Object} remarkoptions - Options for the remark parser.
 */
export const defaults: IOptions;

/**
 * Collect text nodes from an AST.
 *
 * @deprecated
 *
 * This function was never meant to be used directly. It is in the underlying
 * annotatedtext module and is used by the build function.
 *
 * @function collecttextnodes
 * @param ast The AST to collect text nodes from.
 * @param text The text to collect text nodes for.
 * @param options The options to use when collecting text nodes.
 * @returns The collected text nodes.
 */
export function collecttextnodes(
  ast: unknown,
  text: string,
  options?: IOptions,
): IAnnotation[];

/**
 * Compose an annotated text from a text string and an array of text nodes.
 *
 * @deprecated
 *
 * This function was never meant to be used directly. It is in the underlying
 * annotatedtext module and is used by the `build` function.
 *
 * @function compose
 * @param text The text string.
 * @param annotatedtextnodes The text nodes.
 * @param options The options to use.
 * @returns The annotated text.
 */
export function composeannotation(
  text: string,
  annotatedtextnodes: IAnnotatedtext,
  options?: IOptions,
): IAnnotatedtext;

/**
 * Build an annotated text from a Markdown string using the remark parser.
 * @function build
 * @param text The Markdown string to parse.
 * @param options The options to use.
 * @returns The annotated text.
 */
export function build(
  text: string,
  parse: unknown,
  options?: IOptions,
): IAnnotatedtext;
