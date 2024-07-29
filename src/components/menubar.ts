import type { ElementPosition } from "../screen";

export type MenubarConfig = {
  position: ElementPosition;
  padding: ElementPosition;
  spacing: number;
  items: string[];
  selectedItems: string[];
  isVertical: boolean;
  isSelectable: boolean;
  selectedIndex: number;
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
  spacing: 1,
  items: [],
  selectedItems: [],
  isVertical: false,
  isSelectable: false,
  selectedIndex: 0,
};
