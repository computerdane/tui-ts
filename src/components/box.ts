import type { ChalkInstance } from "chalk";
import type { OutlineType } from "../outlines";
import outlines from "../outlines";
import chalk from "chalk";
import screen, { type Drawable } from "../screen";
import stringLength from "string-length";

type BoxConfig = {
  top: number;
  left: number;
  bottom: number;
  right: number;
  title: string;
  titlePadding: number;
  paddingX: number;
  paddingY: number;
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
  paddingX: 0,
  paddingY: 0,
  isOutlined: true,
  outlineType: outlines.line,
  outlineStyle: chalk.gray,
  titleStyle: chalk.white,
};

function Box<P extends Drawable>(_config: Partial<BoxConfig>, parent?: P) {
  const viewport = parent ?? screen;

  let drewOutline = false;
  let drewTitle = false;

  let config: BoxConfig = {
    ...defaults,
    ..._config,
  };

  let width = config.right - config.left;
  let height = config.bottom - config.top;

  return {
    draw() {
      if (config.isOutlined && !drewOutline) {
        const outlineWidth = Math.max(0, width - 2);

        // top
        let lines = [
          `${config.outlineType.topLeft}${config.outlineType.top.repeat(outlineWidth)}${config.outlineType.topRight}`,
        ];
        // left/right
        for (let i = 1; i < height - 1; i++) {
          lines.push(
            `${config.outlineType.left}${" ".repeat(outlineWidth)}${config.outlineType.right}`,
          );
        }
        // bottom
        lines.push(
          `${config.outlineType.bottomLeft}${config.outlineType.bottom.repeat(outlineWidth)}${config.outlineType.bottomRight}`,
        );

        viewport.render(lines, config.left, config.top);

        drewOutline = true;
      }
      if (config.title && !drewTitle) {
        const padding = " ".repeat(config.titlePadding);
        const title = `${padding}${config.titleStyle(config.title)}${padding}`;
        const offset = Math.round((width - stringLength(title)) / 2);

        viewport.render([title], config.left + offset, config.top);

        drewTitle = true;
      }
    },
    render(lines: string[], x: number, y: number) {
      for (const [row, line] of lines.entries()) {
        screen.cursorTo(config.left + x, config.top + y + row);
        console.write(line);
      }
    },
    setBounds(bounds: {
      top?: number;
      left?: number;
      bottom?: number;
      right?: number;
    }) {
      config = { ...config, ...bounds };
      width = config.right - config.left - 1;
      height = config.bottom - config.top - 1;
    },
    setTitle(title: string) {
      config.title = title;
    },
    config,
  };
}

export default Box;
