import Screen from "./src/screen";
import Box from "./src/components/box";
import chalk from "chalk";
import Paragrah from "./src/components/paragraph";
import outlines from "./src/outlines";

Screen.hideCursor();
Screen.clear();

let box = Box(
  {
    top: 0,
    left: 0,
    bottom: Screen.viewportHeight() - 13,
    right: Screen.viewportWidth() - 13,
    title: "hello",
    titleStyle: chalk.blue,
    outlineType: outlines.thiccline,
    // paddingTop: 2,
    // paddingLeft: 1,
    // paddingRight: 3,
    // paddingBottom: 4,
  },
  Screen,
);

box.draw();

let child = Box(
  {
    top: 2,
    left: 3,
    bottom: 20,
    right: 100,
    title: "cool text",
    titleStyle: chalk.red,
    outlineType: outlines.doubleline,
  },
  box,
);

child.draw();

const text = await (
  await fetch("https://www.gnu.org/licenses/gpl-3.0.txt")
).text();

let p = Paragrah(
  {
    content: text,
    style: chalk.red,
    enableWrapping: true,
  },
  child,
);

p.draw();

for await (const line of console) {
  process.exit();
}
