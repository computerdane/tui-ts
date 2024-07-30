import stringLength from "string-length";
import type { ElementPosition, Parent } from "../tui";
import Tui from "../tui";
import chalk, { type ChalkInstance } from "chalk";

export type MenubarConfig = {
  position: ElementPosition;
  padding: ElementPosition;
  alignX: "start" | "center" | "end";
  alignY: "start" | "center" | "end";
  spacing: number;
  items: string[];
  selectedItems: string[];
  isVertical: boolean;
  isSelectable: boolean;
  selectedIndex: number;
  bgStyle: ChalkInstance;
};

const defaults: MenubarConfig = {
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
  alignX: "center",
  alignY: "center",
  spacing: 1,
  items: [],
  selectedItems: [],
  isVertical: false,
  isSelectable: false,
  selectedIndex: 0,
  bgStyle: chalk.reset,
};

export default function Menubar<P extends Parent>(
  _config: Partial<MenubarConfig>,
  _parent?: P,
) {
  const parent = _parent ?? Tui;

  let config: MenubarConfig = {
    ...defaults,
    ..._config,
  };

  return {
    draw() {
      {
        let lines = [];
        for (let i = 0; i < this.height(); i++) {
          lines.push(config.bgStyle(" ").repeat(this.width()));
        }
        parent.render(lines, config.position.left, config.position.top);
      }

      const line = config.items
        .map((item, i) =>
          i === config.selectedIndex ? config.selectedItems[i] : item,
        )
        .join(config.bgStyle(" ").repeat(config.spacing));
      let left = config.position.left + config.padding.left;
      switch (config.alignX) {
        case "center":
          left += (this.viewportWidth() - stringLength(line)) / 2;
          break;
        case "end":
          left += this.viewportWidth() - stringLength(line);
          break;
      }
      left = Math.round(left);
      let top = config.position.top + config.padding.top;
      switch (config.alignY) {
        case "center":
          top += (this.viewportHeight() - 1) / 2;
          break;
        case "end":
          top += this.viewportHeight() - 1;
          break;
      }
      top = Math.round(top);
      parent.render([line], left, top);
    },
    update(_config: Partial<MenubarConfig>) {
      config = { ...config, ..._config };
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
        config.padding.left -
        config.padding.right
      );
    },
    viewportHeight() {
      return (
        config.position.bottom -
        config.position.top -
        config.padding.top -
        config.padding.bottom
      );
    },
    config,
  };
}
