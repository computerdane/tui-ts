export type Drawable = {
  render: (lines: string[], x: number, y: number) => void;
};

const screen = {
  width() {
    return process.stdout.columns;
  },
  height() {
    return process.stdout.rows;
  },
  cursorTo(x: number, y?: number) {
    return process.stdout.cursorTo(x, y);
  },
  moveCursor(dx: number, dy: number) {
    return process.stdout.moveCursor(dx, dy);
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
};

export default screen;
