# VueTs

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Travis](https://img.shields.io/travis/ueqt/vuets.svg)](https://travis-ci.org/ueqt/vuets)
[![Coveralls](https://img.shields.io/coveralls/ueqt/vuets.svg)](https://coveralls.io/github/ueqt/vuets)
[![Dev Dependencies](https://david-dm.org/ueqt/vuets.svg)](https://david-dm.org/ueqt/vuets?type=dev)
[![GitHub stars](https://img.shields.io/github/stars/ueqt/vuets.svg?style=social&logo=github&label=Stars)](https://github.com/ueqt/vuets)
<!-- [![Donate](https://img.shields.io/badge/donate-paypal-blue.svg)](https://paypal.me/ueqt) -->

Rewrite vue using Typescript

* This is a personal research project, DO NOT USE IN PRODUCTION!

[doc](https://ueqt.github.io/vuets/)

### Debug

- UnitTest

`Tests` can debug unittest

- Web

`npm start`或者`npm run build`

run `examples/index.html` or use `Web`, can debug packed ts

### NPM scripts

 - `npm t`: Run test suite
 - `npm start`: Run `npm run build` in watch mode
 - `npm run test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
 - `npm run test:prod`: Run linting and generate coverage
 - `npm run build`: Generate bundles and typings, create docs
 - `npm run lint`: Lints code
 - `npm run commit`: Commit using conventional commit style ([husky](https://github.com/typicode/husky) will tell you to use it if you haven't :wink:)

## 如果vscode里observe.spec.ts里`toHaveBeenLogged`显示红色，可以先打开`helpers/testSetup.d.ts`就好了