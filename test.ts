import Screen from "./src/screen";
import Box from "./src/components/box";
import chalk from "chalk";
import Paragrah from "./src/components/paragraph";
import outlines from "./src/outlines";

Screen.hideCursor();
Screen.clear();

let box = Box(
  {
    position: {
      top: 0,
      left: 0,
      bottom: Screen.viewportHeight(),
      right: Screen.viewportWidth(),
    },
    padding: {
      top: 3,
      left: 20,
      bottom: 3,
      right: 20,
    },
    isOutlined: false,
    bgStyle: chalk.bgGreen,
  },
  Screen,
);

box.draw();

let child = Box(
  {
    position: {
      top: 0,
      left: 0,
      bottom: box.viewportHeight(),
      right: box.viewportWidth(),
    },
    title: "cool text",
    outlineType: outlines.doubleline,
    bgStyle: chalk.bgBlue,
    outlineStyle: chalk.bgMagenta,
  },
  box,
);

child.draw();

const text = await (
  await fetch("https://www.gnu.org/licenses/gpl-3.0.txt")
).text();

let p = Paragrah(
  {
    content: chalk.bgBlue(chalk.white(text)),
    enableWrapping: true,
  },
  child,
);

p.draw();

for await (const line of console) {
  process.exit();
}
