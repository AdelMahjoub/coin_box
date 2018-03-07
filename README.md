## Phaser Typescript webpack template

### Quick start template to develop HTML5 games using phaser and typescript.

### Features
* Phaser 2.6.2
* Typescript and tslint
* 3 States (Boot, Preload and Title)
* Only one webpack config to handle both development and production builds
* Live server with hot module replacement and overlay (Shows a full-screen overlay in the browser when there are compiler errors or warnings)
* Non opinionated boilerplate code for maximum freedom, structure your code the way you want. 
* There is no need to import **pixi** , **p2** and **phaser** in each ts file, they are exposed as globals.
* Faster builds (by parallelising work)

### Setup:

Clone or download this repo.

Move to the downloaded or cloned folder then ```$ npm install ``` to install the dependencies.

**Start the development server**: ```$ npm start ```

**Build the game**: ```$ npm run build ```

The build is in the `dist folder`, your code and phaser code are bundled in two separate files and automatically included in the html file.

