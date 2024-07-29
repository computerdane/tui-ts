import type { ChalkInstance } from "chalk";
import type { OutlineType } from "../outlines";
import outlines from "../outlines";
import chalk from "chalk";
import Screen, { type Parent, type ElementPosition } from "../screen";
import stringLength from "string-length";
import fuckery from "../fuckery";

type BoxConfig = {
  position: ElementPosition;
  padding: ElementPosition;
  title: string;
  titlePadding: number;
  isOutlined: boolean;
  outlineType: OutlineType;
  outlineStyle: ChalkInstance;
  bgStyle: ChalkInstance;
};

const defaults: BoxConfig = {
  position: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  padding: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  title: "",
  titlePadding: 0,
  isOutlined: true,
  outlineType: outlines.line,
  outlineStyle: chalk.gray,
  bgStyle: chalk.reset,
};

export default function Box<P extends Parent>(
  _config: Partial<BoxConfig>,
  _parent?: P,
) {
  const parent = _parent ?? Screen;

  let config: BoxConfig = {
    ...defaults,
    ..._config,
  };

  return {
    draw() {
      let lines = [];
      if (config.isOutlined) {
        const outlineWidth = Math.max(0, this.width() - 2);
        // top
        lines.push(
          `${config.outlineType.topLeft}${config.outlineType.top.repeat(outlineWidth)}${config.outlineType.topRight}`,
        );
        // left/right
        for (let i = 1; i < this.height() - 1; i++) {
          lines.push(
            `${config.outlineType.left}${config.bgStyle(" ").repeat(outlineWidth)}${config.outlineType.right}`,
          );
        }
        // bottom
        lines.push(
          `${config.outlineType.bottomLeft}${config.outlineType.bottom.repeat(outlineWidth)}${config.outlineType.bottomRight}`,
        );
      } else {
        // left/right
        for (let i = 0; i < this.height(); i++) {
          lines.push(config.bgStyle(" ").repeat(this.width()));
        }
      }
      // add style
      lines = lines.map((line) => config.outlineStyle(line));
      parent.render(lines, config.position.left, config.position.top);

      if (config.title) {
        const padding = " ".repeat(config.titlePadding);
        const title = `${padding}${config.title}${padding}`;
        const offset = Math.round((this.width() - stringLength(title)) / 2);

        parent.render(
          [title],
          config.position.left + offset,
          config.position.top,
        );
      }
    },
    render(lines: string[], x: number, y: number) {
      lines = lines
        .slice(
          0,
          this.height() - y - 2 - config.padding.top - config.padding.bottom,
        )
        .map((line) =>
          fuckery.sliceString(
            line,
            this.width() - x - 2 - config.padding.left - config.padding.right,
          ),
        );
      parent.render(
        lines,
        config.position.left + x + config.padding.left + 1,
        config.position.top + y + config.padding.top + 1,
      );
    },
    update(_config: Partial<BoxConfig>) {
      config = { ...config, ..._config };
    },
    clear() {
      parent.render(
        `${" ".repeat(this.width())}\n`.repeat(this.height()).split("\n"),
        0,
        0,
      );
    },
    width() {
      return config.position.right - config.position.left;
    },
    height() {
      return config.position.bottom - config.position.top;
    },
    viewportWidth() {
      return (
        config.position.right -
        config.position.left -
        2 -
        config.padding.left -
        config.padding.right
      );
    },
    viewportHeight() {
      return (
        config.position.bottom -
        config.position.top -
        2 -
        config.padding.top -
        config.padding.bottom
      );
    },
    config,
  };
}
