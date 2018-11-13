# TypeScript React Component Library
This library is meant to show case advanced React/JavaScript development for highly scalable applications.

[![CircleCI](https://circleci.com/gh/pixeloven/typescript-react-component-library.svg?style=svg)](https://circleci.com/gh/pixeloven/typescript-react-component-library)

## Table of Contents

- [Requirements](#requirements)
- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
- [Adding Custom Environment Variables](#adding-custom-environment-variables)
- [Current Tasks](#current-tasks)
- [References](#references)
- [Packages Manager Testing](#packages-manager-testing)

## Requirements
This package has the following requirements for development. Keep in mind that the versions provided are a recomendation and it is possible to work with other versions though not recommended.
- Node >= v8
- Yarn >= 1.9.2

## Directory Structure
```
root
├── .circleci
├── .storybook
├── build
├── coverage
├── lib
├── node_modules
├── public
├── src
│   ├── client
│   │   ├── assets
│   │   │   └── themes
│   │   ├── serviceWorkers
│   ├── server
│   │   ├── controllers
│   │   ├── middleware
│   │   └── views
│   ├── shared
│   │   ├── components
│   │   │   ├── atoms
│   │   │   ├── molecules
│   │   │   ├── organisms
│   │   │   ├── pages
│   │   │   └── templates
```
The structure of this application should be considered living. As new requirements are needed this structure should be able to adapt to change. With that said there was a fair attempt to plan for the future. Below is a quick break down of the above structure.
* `.circleci` configuration for CI build process.
* `.storybook` defines special configuration for storybook. If changes are to be made to the root `tsconfig.json` they should also be carefully considered here too.
* `build` this is a transient directory. It should not be relied on for adding any permanent files. All production files can be found here.
* `coverage` this is a transient directory. It should not be relied on for adding any permanent files. All test coverage files can be found here.
* `lib` contains webpack configuration along with supporting scripts.
* `node_modules` I would hope this is understood ;) but this is also a transient directory used to store our applications dependencies.
* `public` all static files that can be served to the public.
* `src` alright the fun part! Contains all the source files used to build our application.

### Source files
Our source files require a bit more in depth discussion. Our source files are meant to be built in an isomorphic style. Isomorphic or Universal JavaScript is meant to reduce the amount of repeated code and context switching but often comes at the cost of complexity. We introduced a simple file structure to help us reduce thrashing when working in this context.
* `src/client` is the entry point for our build process for all client side code paths.
* `src/server` is the entry point for our build process for all server side code paths.
* `src/shared` contains all source that is universal to the two code paths.

Further down into our `shared` directory structure we have adopted Atomic Design philosophies for creating react components. Please reference [react-atomic-design](https://github.com/danilowoz/react-atomic-design) for more details.

## Design Patterns
atoms/Example
```text
reducers
scss
actions
tests
stories
etc
```
TODO atomic design
## Getting Started

> Note: All cmds listed below can be found in `package.json`.

First we will need to import all dependencies.
```bash
yarn install
```
Now we can either enter into a development environment or build the application. To start let's start up the development environment.
```bash
yarn start
```
This command will add watchers to automatically parts refresh of our application when we make changes to almost any part of our code base. Some exceptions include server side TypeScript and any of the Build files.

Finally if we would like to simply build the application we can run the following.
```bash
yarn build
```
The above will build our SCSS, TypeScript, and Storybook into our build directory.

## Adding Environment Variables
First simply create an `.env` file at the root of this project. Then copy the contents of shown below into the newly created file.
```text
PORT=8080
HOST=localhost
PROTOCOL=http
PUBLIC_URL=/
BUILD_PATH=build
``` 

## Current Tasks
With all of the items below we need to consider whether we want to maintain a single application or multiple applications. Now that we are doing PWA, SSR, etc it might make sense to maintian a single app and just break it into templates and pages.
* Setup error boundries https://reactjs.org/docs/error-boundaries.html
* Create more aliases and eliminate numerous index.ts files
* Add read me about https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers
* Create development entry point for server side code
    * eliminate the .html file and plugins
    * cleanup build scripts even more
    * Add CSS minification https://github.com/NMFR/optimize-css-assets-webpack-plugin
* Add aliases for the atomic design stuff
    * https://stackoverflow.com/questions/43281741/how-to-use-paths-in-tsconfig-json
* Define where `connect` and `reduxForm` will be defined. (Should be outside component)
    * Might make sense to put in the index.ts definition or somewhere else?
* Define where redux-sagas are going to go and build out infrastructure for them
    * We want to make sure they are easy to create and reduce boilerplate
* Define where library files go (Non-components)
    * We want to separate business logic and component UI elements
    * Should investigate how other frameworks do this. 
* Define where reselect is going to be defined
    * Again we want to make it easy to use and make sure it is placed in a place that makes sense
* Define where redux store will be registered. 
    * We should break API/Data vs UI state into two independent parts
        ```bash
          /src/models/data
          /src/models/ui
        ```
        Could be one option? 
    * API/Data should use immutable JS... perhaps everything should?
    * Use reselect to prevent immutableJS for breaking into components
* Look into MVCish frameworks for the client server
* Does it still make sense to use `yarn`? `npm`? Or another alternative?
* Get prettier adn stylelint working together https://www.npmjs.com/package/prettier-stylelint
* Also add stylelint to cli tool


Handling state
* Boilerplating: https://redux.js.org/recipes/reducingboilerplate
* Use redux actions to simplify actions + redux: https://www.npmjs.com/package/redux-actions
* Implement Immutable JS + reselect for pulling data into the view form store
* Think about how to organize reducers: http://nicolasgallagher.com/redux-modules-and-code-splitting/
    * Perhaps container pattern?

## References
1) https://medium.com/airbnb-engineering/rearchitecting-airbnbs-frontend-5e213efc24d2
2) https://medium.com/airbnb-engineering/server-rendering-code-splitting-and-lazy-loading-with-react-router-v4-bfe596a6af70
3) https://medium.com/airbnb-engineering/operationalizing-node-js-for-server-side-rendering-c5ba718acfc9
4) https://medium.com/@stokedbits/adventures-in-creating-a-react-component-library-with-create-react-app-and-typescript-26d1116a7d87


## Packages Manager Testing

yarn install
```bash
yarn install v1.9.4
info No lockfile found.
[1/4] Resolving packages...
warning autoprefixer > browserslist@2.11.3: Browserslist 2 could fail on reading Browserslist >3.0 config used in other tools.
warning babel-preset-react-app > babel-preset-env > browserslist@2.11.3: Browserslist 2 could fail on reading Browserslist >3.0 config used in other tools.
warning css-loader > cssnano > autoprefixer > browserslist@1.7.7: Browserslist 2 could fail on reading Browserslist >3.0 config used in other tools.
warning css-loader > cssnano > postcss-merge-rules > browserslist@1.7.7: Browserslist 2 could fail on reading Browserslist >3.0 config used in other tools.
warning css-loader > cssnano > postcss-merge-rules > caniuse-api > browserslist@1.7.7: Browserslist 2 could fail on reading Browserslist >3.0 config used in other tools.
warning enzyme > rst-selector-parser > nearley > nomnom@1.6.2: Package no longer supported. Contact support@npmjs.com for more info.
[2/4] Fetching packages...
info fsevents@1.2.4: The platform "linux" is incompatible with this module.
info "fsevents@1.2.4" is an optional dependency and failed compatibility check. Excluding it from installation.
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
Done in 45.70s.

```

npm install
```bash
npm WARN deprecated browserslist@2.11.3: Browserslist 2 could fail on reading Browserslist >3.0 config used in other tools.
npm WARN deprecated browserslist@1.7.7: Browserslist 2 could fail on reading Browserslist >3.0 config used in other tools.
npm WARN deprecated nomnom@1.6.2: Package no longer supported. Contact support@npmjs.com for more info.

> node-sass@4.9.3 install /home/brian/Documents/Development/typescript-react-component-library/node_modules/node-sass
> node scripts/install.js

Cached binary found at /home/brian/.npm/node-sass/4.9.3/linux-x64-57_binding.node

> husky@1.0.1 install /home/brian/Documents/Development/typescript-react-component-library/node_modules/husky
> node husky install

husky > setting up git hooks
husky > done

> uglifyjs-webpack-plugin@0.4.6 postinstall /home/brian/Documents/Development/typescript-react-component-library/node_modules/webpack/node_modules/uglifyjs-webpack-plugin
> node lib/post_install.js


> node-sass@4.9.3 postinstall /home/brian/Documents/Development/typescript-react-component-library/node_modules/node-sass
> node scripts/build.js

Binary found at /home/brian/Documents/Development/typescript-react-component-library/node_modules/node-sass/vendor/linux-x64-57/binding.node
Testing binary
Binary is fine
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN webpack-dev-middleware@3.4.0 requires a peer of webpack@^4.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})

added 2260 packages from 1164 contributors and audited 50421 packages in 45.283s
found 0 vulnerabilities

```
