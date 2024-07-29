import Screen, { type Parent } from "../screen";
import fuckery from "../fuckery";

export type ParagraphConfig = {
  content: string;
  enableWrapping: boolean;
};

const defaults: ParagraphConfig = {
  content: "",
  enableWrapping: false,
};

export default function Paragrah<P extends Parent>(
  _config: Partial<ParagraphConfig>,
  _parent?: P,
) {
  const parent = _parent ?? Screen;

  let config: ParagraphConfig = {
    ...defaults,
    ..._config,
  };

  return {
    draw() {
      let lines = config.content.split("\n");
      if (config.enableWrapping) {
        const viewportWidth = parent.viewportWidth();
        const viewportHeight = parent.viewportHeight();
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
      parent.render(lines, 0, 0);
    },
    setContent(content: string) {
      config.content = content;
    },
    config,
  };
}
