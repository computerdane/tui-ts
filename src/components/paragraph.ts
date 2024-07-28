import type { ChalkInstance } from "chalk";
import chalk from "chalk";
import Screen, { type RenderTarget } from "../screen";
import fuckery from "../fuckery";

export type ParagraphConfig = {
  content: string;
  style: ChalkInstance;
  enableWrapping: boolean;
};

const defaults: ParagraphConfig = {
  content: "",
  style: chalk.white,
  enableWrapping: false,
};

export default function Paragrah<P extends RenderTarget>(
  _config: Partial<ParagraphConfig>,
  parent?: P,
) {
  const target = parent ?? Screen;

  let config: ParagraphConfig = {
    ...defaults,
    ..._config,
  };

  return {
    draw() {
      let lines = config.style(config.content).split("\n");
      if (config.enableWrapping) {
        const viewportWidth = target.viewportWidth();
        const viewportHeight = target.viewportHeight();
        const wrappedLines = [];
        for (let line of lines) {
          if (wrappedLines.length > viewportHeight) {
            break;
          }
          while (line.length > viewportWidth) {
            const sliced = fuckery.sliceString(line, viewportWidth);
            wrappedLines.push(sliced);
            line = line.substring(sliced.length);
          }
          wrappedLines.push(line);
        }
        lines = wrappedLines;
      }
      target.render(lines, 0, 0);
    },
  };
}
