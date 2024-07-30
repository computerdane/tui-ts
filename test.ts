import Tui from "./src/tui";
import Box from "./src/components/box";
import chalk from "chalk";
import Paragrah from "./src/components/paragraph";
import outlines from "./src/outlines";
import Menubar from "./src/components/menubar";

Tui.hideCursor();
Tui.clear();
Tui.enableKeypressEvents();

Tui.addKeypressHandler((_chunk, key) => {
  if (key.name === "q" || (key.ctrl && key.name === "c")) {
    Tui.clear();
    Tui.showCursor();
    process.exit();
  }
});

let menubar = Menubar({
  position: {
    top: 0,
    left: 0,
    bottom: 5,
    right: Tui.viewportWidth(),
  },
  items: [
    "option " + chalk.red("1"),
    "option " + chalk.red("2"),
    "option " + chalk.red("3"),
    "option " + chalk.red("4"),
  ].map((i) => chalk.bold.bgGray(i)),
  selectedItems: ["option 1", "option 2", "option 3", "option 4"].map((i) =>
    chalk.bold.inverse(i),
  ),
  // alignY: "end",
  isSelectable: true,
  spacing: 5,
  bgStyle: chalk.bgGray,
});
menubar.draw();

Tui.addKeypressHandler((_chunk, key) => {
  if (
    key.name === "1" ||
    key.name === "2" ||
    key.name === "3" ||
    key.name === "4"
  ) {
    menubar.update({
      selectedIndex: parseInt(key.name) - 1,
    });
    menubar.draw();
  }
});

let box = Box(
  {
    position: {
      top: 5,
      left: 0,
      bottom: Tui.viewportHeight(),
      right: Tui.viewportWidth(),
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
  Tui,
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
    content: chalk.bgBlue(chalk.black(text)),
    enableWrapping: true,
  },
  child,
);

p.draw();
