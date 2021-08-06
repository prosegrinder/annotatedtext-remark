// var expect = require("chai").expect;
import chai from chai;
// var builder = require("../out/index");
import * as builder from "../out/index.js";
// var fs = require("fs");
import fs from "fs";

describe("#build()", function () {
  // Original Test Case
  it("should return the expected annotated text object", function () {
    const expected = JSON.parse(
      fs.readFileSync("./tests/annotatedtext-original.json", "utf8"),
    );
    const text = fs.readFileSync("./tests/test-original.md", "utf8");
    const result = builder.build(text);
    // fs.writeFileSync(
    //   "./out/annotatedtext-original.json",
    //   JSON.stringify(result, null, 2),
    // );
    chai.expect(result).to.deep.equal(expected);
  });

  it("should match the original document exactly", function () {
    const expected = fs.readFileSync("./tests/test-original.md", "utf8");
    const annotatedtext = builder.build(expected);
    const annotation = annotatedtext.annotation;
    let result = "";
    for (let node of annotation) {
      const text = node.text ? node.text : node.markup;
      result += text;
    }
    chai.expect(result).to.equal(expected);
  });

  // Frontmatter Test Case
  it("should return the expected annotated text object with frontmatter", function () {
    const expected = JSON.parse(
      fs.readFileSync("./tests/annotatedtext-frontmatter.json", "utf8"),
    );
    const text = fs.readFileSync("./tests/test-frontmatter.md", "utf8");
    const result = builder.build(text);
    // fs.writeFileSync(
    //   "./out/annotatedtext-frontmatter.json",
    //   JSON.stringify(result, null, 2),
    // );
    chai.expect(result).to.deep.equal(expected);
  });

  it("should match the original document exactly with frontmatter", function () {
    const expected = fs.readFileSync("./tests/test-frontmatter.md", "utf8");
    const annotatedtext = builder.build(expected);
    const annotation = annotatedtext.annotation;
    let result = "";
    for (let node of annotation) {
      const text = node.text ? node.text : node.markup;
      result += text;
    }
    chai.expect(result).to.equal(expected);
  });

  // Escape Character Test Case
  it("should return the expected annotated text object with the escape character", function () {
    const expected = JSON.parse(
      fs.readFileSync("./tests/escape-character.json", "utf8"),
    );
    const text = fs.readFileSync("./tests/escape-character.md", "utf8");
    const result = builder.build(text);
    // fs.writeFileSync(
    //   "./out/escape-character.json",
    //   JSON.stringify(result, null, 2),
    // );
    chai.expect(result).to.deep.equal(expected);
  });

  it("should match the original document exactly with the escape character", function () {
    const expected = fs.readFileSync("./tests/escape-character.md", "utf8");
    const annotatedtext = builder.build(expected);
    const annotation = annotatedtext.annotation;
    let result = "";
    for (let node of annotation) {
      const text = node.text ? node.text : node.markup;
      result += text;
    }
    chai.expect(result).to.equal(expected);
  });
});
