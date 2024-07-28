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
    bottom: screen.height(),
    right: screen.width(),
    title: "hello",
    titleStyle: chalk.blue,
  },
  screen,
);

box.draw();

await sleep(2000);

box.clear();

box.setBounds({ top: 2, left: 2, right: 20, bottom: 10 });

box.draw();

await sleep(10000);
