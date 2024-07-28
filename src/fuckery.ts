import stringLength from "string-length";

const fuckery = {
  sliceString(s: string, length: number) {
    while (stringLength(s) > length) {
      s = s.slice(0, -1);
    }
    return s;
  },
};

export default fuckery;
