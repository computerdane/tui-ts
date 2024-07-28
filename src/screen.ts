import readline from "node:readline";
import os from "os";

export type Parent = {
  render: (lines: string[], x: number, y: number) => void;
  viewportWidth: () => number;
  viewportHeight: () => number;
};

export type ElementPosition = {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
};

const Screen = {
  viewportWidth() {
    return process.stdout.columns;
  },
  viewportHeight() {
    return process.stdout.rows;
  },
  cursorTo(x: number, y: number) {
    while (!readline.cursorTo(process.stdout, x, y)) {}
  },
  render(lines: string[], x: number, y: number) {
    for (const [row, line] of lines.entries()) {
      this.cursorTo(x, y + row);
      console.write(line);
    }
  },
  hideCursor() {
    console.write("\u001B[?25l");
  },
  showCursor() {
    console.write("\u001B[?25h");
  },
  clear() {
    console.clear();
  },
  shell() {
    return os.platform() === "win32" ? "powershell.exe" : "bash";
  },
};

export default Screen;
