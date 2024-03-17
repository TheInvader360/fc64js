import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['./src/**'],
  coveragePathIgnorePatterns : [
    './src/audio.ts',
    './src/classes.ts',
    './src/color.ts',
    './src/gamepadExternal.ts',
    './src/gamepadTouch.ts',
    './src/keyboard.ts',
    './src/main.ts',
  ],
};

export default config;
