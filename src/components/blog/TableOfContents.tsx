import type { MarkdownHeading } from "astro";
import styles from "./TableOfContents.module.css";
import type { JSX } from "react/jsx-runtime";
import React from "react";

type TableOfContentsProps = {
  headings: MarkdownHeading[];
};

class HeadingNode {
  text: string;
  slug: string;
  depth: number;
  children: HeadingNode[];

  constructor(text: string, slug: string, depth: number) {
    this.text = text;
    this.slug = slug;
    this.depth = depth;
    this.children = [];
  }

  addChild(child: HeadingNode) {
    this.children.push(child);
  }

  toJSX(): JSX.Element {
    let index = 0;

    const toc0 = styles.toc0;
    const toc1 = styles.toc1;

    function getRomanNumeral(num: number): string {
      const values = [10, 9, 5, 4, 1];
      const numerals = ["X", "IX", "V", "IV", "I"];

      let result = "";

      for (let i = 0; i < values.length; i++) {
        while (num >= values[i]) {
          result += numerals[i];
          num -= values[i];
        }
      }

      return result;
    }

    function getHeader(child: HeadingNode, numbering: number) {
      return (
        <li className={index++ % 2 == 0 ? toc0 : toc1}>
          <a href={`#${child.slug}`}>
            {<span className={styles.numbering}>{getRomanNumeral(numbering)}</span>}
            {child.text}
          </a>
        </li>
      );
    }

    function createJSXList(root: HeadingNode): JSX.Element {
      let numbering = 1;
      return (
        <ul>
          {root.children.map((child) => {
            if (child.children.length > 0) {
              return (
                <React.Fragment key={child.slug}>
                  {getHeader(child, numbering++)}
                  {createJSXList(child)}
                </React.Fragment>
              );
            } else {
              return <React.Fragment key={child.slug}>
                  {getHeader(child, numbering++)}
                </React.Fragment>
            }
          })}
        </ul>
      );
    }

    return createJSXList(this);
  }
}

function TableOfContents(headings: TableOfContentsProps) {
  const { headings: headingList } = headings;

  const rootNode: HeadingNode = new HeadingNode("Table of Contents", "", 0);
  const stack: HeadingNode[] = [rootNode];
  let lastNode: HeadingNode = rootNode;
  let index = 0;

  while (index < headingList.length) {
    const currHeading = headingList[index];
    let currNode = new HeadingNode(currHeading.text, currHeading.slug, currHeading.depth);

    if (currNode.depth > stack.length) {
      // We are deeper in the stack
      stack.push(lastNode);
    }

    if (currNode.depth < stack.length) {
      stack.pop();
    }

    if (currNode.depth == stack.length) {
      stack[stack.length - 1].addChild(currNode);
    } else {
      console.warn("Table of Contents depth incorrect");
    }

    lastNode = currNode;
    index++;
  }

  return (
    <div className={styles.tableOfContents}>
      <h3>Table of Contents</h3>
      {rootNode.toJSX()}
    </div>
  );
}

export default TableOfContents;
