# fc64js - library development

If you want to make changes to the library (note: none of this is necessary if your aim is to simply write fc64js games and demos) you will need [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed locally. It is recommended that you also install [git](https://github.com/git-guides/install-git) and [vscode](https://code.visualstudio.com/download)

```bash
git clone https://github.com/TheInvader360/fc64js.git
cd fc64js
npm ci
```

[Rollup](https://rollupjs.org/) watches for code changes and recompiles the library bundle automatically as required. You can start it running with this command - ```npm run rollup-watch```

[Browsersync](https://browsersync.io/) watches for file changes and reloads your browser automatically as required, and facilitates testing on devices other than localhost (e.g. a phone or tablet). You can start it running with this command - ```npm run browser-sync-start```

Having made your changes you can run [eslint](https://eslint.org/), [prettier](https://prettier.io/), and [jest](https://jestjs.io/) tests with these commands - ```npm run lint```, ```npm run prettier-check```, ```npm run prettier-write```, and ```npm run test```
