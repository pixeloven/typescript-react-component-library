# TypeScript React Component Library

### Environment Setup

            REACT_APP_* environment variables and prepare them to be
            // Useful for determining whether we're running in production mode.
            // Most importantly, it switches React into the correct mode.
            NODE_ENV: process.env.NODE_ENV || 'development',
            // Useful for resolving the correct path to static assets in `public`.
            // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
            // This should only be used as an escape hatch. Normally you would put
            // images into the `src` and `import` them in code to get their paths.
            PUBLIC_URL: publicUrl,

### Tasks
With all of the items below we need to consider whether we want to maintain a single application or multiple applications. Now that we are doing PWA, SSR, etc it might make sense to maintian a single app and just break it into templates and pages.
* Create a build step for importing in semantic ui scss 
* Clean up the requires in storybook
    ```js
    const withReadme = (require("storybook-readme/with-readme") as any).default;
    const readme = require("./README.md");
    ```
    Need to figure out how to do this while also supporitng TypeScript.
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
* Need to convert node to TypeScript
    * Fork and rewrite client
    * Possibly fork and rewrite server or write definitions
* Update TSLint/ TS Config
    *  Prevent the use of standard JS.
    * Do we want this? https://www.npmjs.com/package/tslint-config-airbnb
    * "src/**.js" adn make it pure TS
    * tsconfig __snapshot__ vs __mocks__
* Test out hypernova and variants for SSR as a service
    * Might be able to add a .ssr in source to designate that a component can be rendered server side.
    * Need to generate a distribution library not just a standard build
* Might use nwb vs neutrino instead of create react app
    * We might need to eject the current config. (Currently trying to keep it all simple until ready for prod)
* Move storybook down or upgrade scripts but either way we should consolidate some of the babel deps
* See if we can also write node code in typescript
* ejected config
    * can add scss loader instead of the hack job I have
    * cleanup dependecies
    * can get watch to work with the server too?
* Need to hide build scripts that shouldn't be public
* Does it still make sense to use `yarn`? `npm`? Or another alternative?
* Upgrade to webpack 4

### References
1) https://medium.com/airbnb-engineering/rearchitecting-airbnbs-frontend-5e213efc24d2
2) https://medium.com/airbnb-engineering/server-rendering-code-splitting-and-lazy-loading-with-react-router-v4-bfe596a6af70
3) https://medium.com/airbnb-engineering/operationalizing-node-js-for-server-side-rendering-c5ba718acfc9
4) https://medium.com/@stokedbits/adventures-in-creating-a-react-component-library-with-create-react-app-and-typescript-26d1116a7d87


### Packages Test

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
