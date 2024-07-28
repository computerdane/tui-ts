import screen from "./src/screen";
import Box from "./src/components/box";
import { sleep } from "bun";
import chalk from "chalk";

screen.hideCursor();
screen.clear();

const box = Box(
  {
    top: 0,
    left: 0,
    bottom: screen.height(),
    right: screen.width(),
    title: "hello",
    titleStyle: chalk.blue,
    titlePadding: 10,
  },
  screen,
);

box.draw();

const children: any = [box];

for (let i = 0; i < 2; i++) {
  const child = Box(
    {
      top: 2,
      left: 2,
      bottom: children.at(-1).config.bottom - 2,
      right: children.at(-1).config.right - 2,
      title: "hello",
      titleStyle: chalk.blue,
      titlePadding: 10,
    },
    children.at(-1),
  );

  child.draw();

  children.push(child);
}

// const child = Box(
//   {
//     top: 2,
//     left: 3,
//     bottom: 10,
//     right: 12,
//   },
//   box,
// );

// child.draw()

sleep(10000);
