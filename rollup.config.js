import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import terser from '@rollup/plugin-terser';

export default {
  input: "src/main.ts",
  output: [
    {
      file: "lib/fc64.js",
      format: "iife",
      name: "window",
      extend: true,
    },
    {
			file: "lib/fc64.min.js",
			format: "iife",
			name: "window",
      extend: true,
			plugins: [terser()],
		}
  ],
  plugins: [
    typescript({ tsconfig: "tsconfig.json" }),
    commonjs(),
    replace({
      values: { "this.window = this.window": "window" },
      preventAssignment: true,
    }),
  ],
};
