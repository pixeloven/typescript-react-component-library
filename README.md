# TypeScript React Component Library


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

### References
1) https://medium.com/airbnb-engineering/rearchitecting-airbnbs-frontend-5e213efc24d2
2) https://medium.com/airbnb-engineering/server-rendering-code-splitting-and-lazy-loading-with-react-router-v4-bfe596a6af70
3) https://medium.com/airbnb-engineering/operationalizing-node-js-for-server-side-rendering-c5ba718acfc9
4) https://medium.com/@stokedbits/adventures-in-creating-a-react-component-library-with-create-react-app-and-typescript-26d1116a7d87
