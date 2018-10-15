# TypeScript React Component Library
This library is meant to show case advanced React/JavaScript development for highly scalable applications.

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
typeScript-react-component-library
├── .storybook
├── build
├── config
├── node_modules
├── public
├── scripts
├── src
│   ├── browser
│   │   ├── serviceWorkers
│   ├── server
│   │   ├── controllers
│   │   └── templates
│   ├── shared
│   │   ├── assets
│   │   │   └── themes
│   │   ├── components
│   │   │   ├── atoms
│   │   │   ├── molecules
│   │   │   ├── organisms
│   │   │   ├── pages
│   │   │   └── themplates
```
The structure of this application should be considered living. As new requirements are needed this structure should be able to adapt to change. With that said there was a fair attempt to plan for the future. Below is a quick break down of the above structure.
* `.storybook` defines speciall configuration for storybook. If changes are to be made to the root `tsconfig.json` they should also be carefully considered here too.
* `build` this is a transient directory. It should not be relied on for adding any permanent files. All production files can be found here.
* `config` contains webpack configuration along with supporting scripts. 
* `node_modules` I would hope this is understood ;) but this is also a transient directory used to store our applications dependencies.
* `public` all static files that can be served to the public.
* `scripts` contains scripts that are used in building, developing and testing our code.
* `src` alright the fun part! Contains all the source files used to build our application.

### Source files
Our source files require a bit more in depth discussion. Our source files are meant to be built in an isomorphic style. Isomorphic or Universal JavaScript is meant to reduce the amount of repeated code and context switching but often comes at the cost of complexity. We introduced a simple file structure to help us reduce thrashing when working in this context.
* `src/browser` is the entry point for our build process for all client side code paths.
* `src/server` is the entry point for our build process for all server side code paths.
* `src/shared` contains all source that is universal to the two code paths.

Further down into our `shared` directory structure we have adopted Atomic Design philosiphies for creating react components. Please reference [react-atomic-design](https://github.com/danilowoz/react-atomic-design) for more details.

## Getting Started

> Note: All cmds listed below can be found in `package.json`.

First we will need to import all dependencies.
```bash
yarn install
```

Now we can either enter into a development enviroment or build the application. To start let's start up the development enviroment.
```bash
yarn start
```
This command will add watchers to automatically parts refresh of our application when we make changes to almost any part of our code base. Some exceptions include server side TypeScript and any of the Build files.

Finally if we would like to simply build the application we can run the following.
```bash
yarn build
```
The above will build our SCSS, TypeScript, and Storybook into our build directory.

## Adding Custom Environment Variables

> Note: This section is a direct reference from [create-react-app](https://github.com/facebook/create-react-app).

Your project can consume variables declared in your environment as if they were declared locally in your JS files. By
default you will have `NODE_ENV` defined for you, and any other environment variables starting with
`REACT_APP_`.

**The environment variables are embedded during the build time**. Since Create React App produces a static HTML/CSS/JS bundle, it can’t possibly read them at runtime. To read them at runtime, you would need to load HTML into memory on the server and replace placeholders in runtime, just like [described here](#injecting-data-from-the-server-into-the-page). Alternatively you can rebuild the app on the server anytime you change them.

> Note: You must create custom environment variables beginning with `REACT_APP_`. Any other variables except `NODE_ENV` will be ignored to avoid accidentally [exposing a private key on the machine that could have the same name](https://github.com/facebook/create-react-app/issues/865#issuecomment-252199527). Changing any environment variables will require you to restart the development server if it is running.

These environment variables will be defined for you on `process.env`. For example, having an environment
variable named `REACT_APP_SECRET_CODE` will be exposed in your JS as `process.env.REACT_APP_SECRET_CODE`.

There is also a special built-in environment variable called `NODE_ENV`. You can read it from `process.env.NODE_ENV`. When you run `npm start`, it is always equal to `'development'`, when you run `npm test` it is always equal to `'test'`, and when you run `npm run build` to make a production bundle, it is always equal to `'production'`. **You cannot override `NODE_ENV` manually.** This prevents developers from accidentally deploying a slow development build to production.

These environment variables can be useful for displaying information conditionally based on where the project is
deployed or consuming sensitive data that lives outside of version control.

First, you need to have environment variables defined. For example, let’s say you wanted to consume a secret defined
in the environment inside a `<form>`:

```jsx
render() {
  return (
    <div>
      <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
      <form>
        <input type="hidden" defaultValue={process.env.REACT_APP_SECRET_CODE} />
      </form>
    </div>
  );
}
```

During the build, `process.env.REACT_APP_SECRET_CODE` will be replaced with the current value of the `REACT_APP_SECRET_CODE` environment variable. Remember that the `NODE_ENV` variable will be set for you automatically.

When you load the app in the browser and inspect the `<input>`, you will see its value set to `abcdef`, and the bold text will show the environment provided when using `npm start`:

```html
<div>
  <small>You are running this application in <b>development</b> mode.</small>
  <form>
    <input type="hidden" value="abcdef" />
  </form>
</div>
```

The above form is looking for a variable called `REACT_APP_SECRET_CODE` from the environment. In order to consume this
value, we need to have it defined in the environment. This can be done using two ways: either in your shell or in
a `.env` file. Both of these ways are described in the next few sections.

Having access to the `NODE_ENV` is also useful for performing actions conditionally:

```js
if (process.env.NODE_ENV !== 'production') {
  analytics.disable();
}
```

When you compile the app with `npm run build`, the minification step will strip out this condition, and the resulting bundle will be smaller.

### Referencing Environment Variables in the HTML

> Note: this feature is available with `react-scripts@0.9.0` and higher.

You can also access the environment variables starting with `REACT_APP_` in the `public/index.html`. For example:

```html
<title>%REACT_APP_WEBSITE_NAME%</title>
```

Note that the caveats from the above section apply:

- Apart from a few built-in variables (`NODE_ENV` and `PUBLIC_URL`), variable names must start with `REACT_APP_` to work.
- The environment variables are injected at build time. If you need to inject them at runtime, [follow this approach instead](#generating-dynamic-meta-tags-on-the-server).

### Adding Temporary Environment Variables In Your Shell

Defining environment variables can vary between OSes. It’s also important to know that this manner is temporary for the
life of the shell session.

#### Windows (cmd.exe)

```cmd
set "REACT_APP_SECRET_CODE=abcdef" && npm start
```

(Note: Quotes around the variable assignment are required to avoid a trailing whitespace.)

#### Windows (Powershell)

```Powershell
($env:REACT_APP_SECRET_CODE = "abcdef") -and (npm start)
```

#### Linux, macOS (Bash)

```bash
REACT_APP_SECRET_CODE=abcdef npm start
```

### Adding Development Environment Variables In `.env`

> Note: this feature is available with `react-scripts@0.5.0` and higher.

To define permanent environment variables, create a file called `.env` in the root of your project:

```
REACT_APP_SECRET_CODE=abcdef
```

> Note: You must create custom environment variables beginning with `REACT_APP_`. Any other variables except `NODE_ENV` will be ignored to avoid [accidentally exposing a private key on the machine that could have the same name](https://github.com/facebook/create-react-app/issues/865#issuecomment-252199527). Changing any environment variables will require you to restart the development server if it is running.

`.env` files **should be** checked into source control (with the exclusion of `.env*.local`).

#### What other `.env` files can be used?

> Note: this feature is **available with `react-scripts@1.0.0` and higher**.

- `.env`: Default.
- `.env.local`: Local overrides. **This file is loaded for all environments except test.**
- `.env.development`, `.env.test`, `.env.production`: Environment-specific settings.
- `.env.development.local`, `.env.test.local`, `.env.production.local`: Local overrides of environment-specific settings.

Files on the left have more priority than files on the right:

- `npm start`: `.env.development.local`, `.env.development`, `.env.local`, `.env`
- `npm run build`: `.env.production.local`, `.env.production`, `.env.local`, `.env`
- `npm test`: `.env.test.local`, `.env.test`, `.env` (note `.env.local` is missing)

These variables will act as the defaults if the machine does not explicitly set them.<br>
Please refer to the [dotenv documentation](https://github.com/motdotla/dotenv) for more details.

> Note: If you are defining environment variables for development, your CI and/or hosting platform will most likely need
> these defined as well. Consult their documentation how to do this. For example, see the documentation for [Travis CI](https://docs.travis-ci.com/user/environment-variables/) or [Heroku](https://devcenter.heroku.com/articles/config-vars).

#### Expanding Environment Variables In `.env`

> Note: this feature is available with `react-scripts@1.1.0` and higher.

Expand variables already on your machine for use in your `.env` file (using [dotenv-expand](https://github.com/motdotla/dotenv-expand)).

For example, to get the environment variable `npm_package_version`:

```
REACT_APP_VERSION=$npm_package_version
# also works:
# REACT_APP_VERSION=${npm_package_version}
```

Or expand variables local to the current `.env` file:

```
DOMAIN=www.example.com
REACT_APP_FOO=$DOMAIN/foo
REACT_APP_BAR=$DOMAIN/bar
```


## Current Tasks
With all of the items below we need to consider whether we want to maintain a single application or multiple applications. Now that we are doing PWA, SSR, etc it might make sense to maintian a single app and just break it into templates and pages.
* Add linting to all files
    * First need to port everything to TS
    * Second update lint scripts to check all files and prevent JS
* Create a build step for importing in semantic ui scss (might not be a good idea yet)
* Upgrade to webpack 4
    * More than likely required to gt storybook working
    * likely need to find alternatives for the .env import and uglify
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
* Look into MVCish frameworks for the client server
* Does it still make sense to use `yarn`? `npm`? Or another alternative?

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
