import type { ChalkInstance } from "chalk";
import type { OutlineType } from "../outlines";
import outlines from "../outlines";
import chalk from "chalk";
import screen, { type RenderTarget } from "../screen";
import stringLength from "string-length";

type BoxConfig = {
  top: number;
  left: number;
  bottom: number;
  right: number;
  title: string;
  titlePadding: number;
  paddingTop: number;
  paddingLeft: number;
  paddingBottom: number;
  paddingRight: number;
  isOutlined: boolean;
  outlineType: OutlineType;
  outlineStyle: ChalkInstance;
  titleStyle: ChalkInstance;
};

const defaults: BoxConfig = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  title: "",
  titlePadding: 1,
  paddingTop: 0,
  paddingLeft: 0,
  paddingBottom: 0,
  paddingRight: 0,
  isOutlined: true,
  outlineType: outlines.line,
  outlineStyle: chalk.gray,
  titleStyle: chalk.white,
};

function Box<P extends RenderTarget>(_config: Partial<BoxConfig>, parent?: P) {
  const target = parent ?? screen;

  let drewOutline = false;
  let drewTitle = false;

  let config: BoxConfig = {
    ...defaults,
    ..._config,
  };

  return {
    draw() {
      if (config.isOutlined && !drewOutline) {
        const outlineWidth = Math.max(0, this.width() - 2);

        // top
        let lines = [
          `${config.outlineType.topLeft}${config.outlineType.top.repeat(outlineWidth)}${config.outlineType.topRight}`,
        ];
        // left/right
        for (let i = 1; i < this.height() - 1; i++) {
          lines.push(
            `${config.outlineType.left}${" ".repeat(outlineWidth)}${config.outlineType.right}`,
          );
        }
        // bottom
        lines.push(
          `${config.outlineType.bottomLeft}${config.outlineType.bottom.repeat(outlineWidth)}${config.outlineType.bottomRight}`,
        );
        // add style
        lines = lines.map((line) => config.outlineStyle(line));

        target.render(lines, config.left, config.top);

        drewOutline = true;
      }
      if (config.title && !drewTitle) {
        const padding = " ".repeat(config.titlePadding);
        const title = `${padding}${config.titleStyle(config.title)}${padding}`;
        const offset = Math.round((this.width() - stringLength(title)) / 2);

        target.render([title], config.left + offset, config.top);

        drewTitle = true;
      }
    },
    render(lines: string[], x: number, y: number) {
      for (let [row, line] of lines
        .slice(
          0,
          this.height() - y - 2 - config.paddingTop - config.paddingBottom,
        )
        .entries()) {
        this.cursorTo(
          config.left + x + config.paddingLeft,
          config.top + y + config.paddingTop + row,
        );
        while (
          stringLength(line) >
          this.width() - x - 2 - config.paddingLeft - config.paddingRight
        ) {
          line = line.slice(0, -1);
        }
        console.write(line);
      }
    },
    cursorTo(x: number, y: number) {
      return target.cursorTo(config.left + x + 1, config.top + y + 1);
    },
    clear() {
      for (let row = 0; row < this.height(); row++) {
        this.cursorTo(0, row);
        console.write(" ".repeat(this.width()));
      }
    },
    setBounds(bounds: {
      top?: number;
      left?: number;
      bottom?: number;
      right?: number;
    }) {
      config = { ...config, ...bounds };
      drewOutline = false;
      drewTitle = false;
    },
    setTitle(title: string) {
      config.title = title;
    },
    width() {
      return config.right - config.left;
    },
    height() {
      return config.bottom - config.top;
    },
    config,
  };
}

export default Box;
