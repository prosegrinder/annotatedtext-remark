"use strict";

var expect = require("chai").expect;
var builder = require("../index");
var fs = require("fs");

describe("#build()", function () {

  // Original Test Case
  it("should return the expected annotated text object", function () {
    const expected = JSON.parse(fs.readFileSync("./test/annotatedtext-original.json", "utf8"));
    const text = fs.readFileSync("./test/test-original.md", "utf8");
    const result = builder.build(text);
    // fs.writeFileSync("./test/annotatedtext-original-tmp.json", JSON.stringify(result, null, 2));
    expect(result).to.deep.equal(expected);
  });

  it("should match the original document exactly", function () {
    const expected = fs.readFileSync("./test/test-original.md", "utf8");
    const annotatedtext = builder.build(expected);
    const annotation = annotatedtext.annotation;
    let result = "";
    for (let node of annotation) {
      const text = node.text ? node.text : node.markup;
      result += text;
    }
    expect(result).to.equal(expected);
  });

  // Frontmatter Test Case
  it("should return the expected annotated text object with frontmatter", function () {
    const expected = JSON.parse(fs.readFileSync("./test/annotatedtext-frontmatter.json", "utf8"));
    const text = fs.readFileSync("./test/test-frontmatter.md", "utf8");
    const result = builder.build(text);
    // fs.writeFileSync("./test/annotatedtext-frontmatter-tmp.json", JSON.stringify(result, null, 2));
    expect(result).to.deep.equal(expected);
  });

  it("should match the original document exactly with frontmatter", function () {
    const expected = fs.readFileSync("./test/test-frontmatter.md", "utf8");
    const annotatedtext = builder.build(expected);
    const annotation = annotatedtext.annotation;
    let result = "";
    for (let node of annotation) {
      const text = node.text ? node.text : node.markup;
      result += text;
    }
    expect(result).to.equal(expected);
  });

  // Escape Character Test Case
  it("should return the expected annotated text object with the escape character", function () {
    const expected = JSON.parse(fs.readFileSync("./test/escape-character.json", "utf8"));
    const text = fs.readFileSync("./test/escape-character.md", "utf8");
    const result = builder.build(text);
    // fs.writeFileSync("./test/escape-character-tmp.json", JSON.stringify(result, null, 2));
    expect(result).to.deep.equal(expected);
  });

  it("should match the original document exactly with the escape character", function () {
    const expected = fs.readFileSync("./test/escape-character.md", "utf8");
    const annotatedtext = builder.build(expected);
    const annotation = annotatedtext.annotation;
    let result = "";
    for (let node of annotation) {
      const text = node.text ? node.text : node.markup;
      result += text;
    }
    expect(result).to.equal(expected);
  });

});
