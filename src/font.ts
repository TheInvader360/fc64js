export type fontDefinition = {
  charWidth: number;
  charHeight: number;
  charTrackingDefault: number;
  charMap: number[][]; // characters defined in ascii code order from 32 (space) to 126 (tilde)
};
