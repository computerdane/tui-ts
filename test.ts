import screen from "./src/screen";
import Box from "./src/components/box";
import { sleep } from "bun";
import chalk from "chalk";

screen.hideCursor();
screen.clear();

let box = Box(
  {
    top: 0,
    left: 0,
    bottom: screen.height() - 13,
    right: screen.width() - 13,
    title: "hello",
    titleStyle: chalk.blue,
    paddingTop: 2,
    paddingLeft: 1,
    paddingRight: 3,
    paddingBottom: 4,
  },
  screen,
);

box.draw();

let child = Box(
  {
    top: 0,
    left: 0,
    bottom: screen.height(),
    right: screen.width(),
    title: "hello",
    titleStyle: chalk.blue,
  },
  box,
);

child.draw();

await sleep(10000);
