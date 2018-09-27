# TypeScript React Component Library

#### TODO
* Story book is putting files in public... but we also have build?
* Can we build all the files in public too?
* Create more static content and test SSR
* Create a build step for importing in semantic ui scss 
* Better define src routes:
    * no longer need to do `src/`
    * MenuItemArray/MenuItemArray into MenuItemArray
* Lint for js files and fail to prevent
* Auto fix some issues while watching?
* Better watching for elements not in immediate build for index.tsx
* Clean up the requires in storybook
    ```js
    const withReadme = (require("storybook-readme/with-readme") as any).default;
    const readme = require("./README.md");
    ```
* https://www.npmjs.com/package/tslint-config-airbnb Do we want this?
* Need to remove     "src/**.js" adn make it pure TS
* Might be able to add a .ssr in source to designate that a component can be rendered server side?
    * Should do something similar for connected?
* Might use nwb vs neutrino instead of create react app
* tsconfig __snapshot__ vs __mocks__



// TODO need to generate dist + standard build?
// TODO rewrite client in type script then server
https://medium.com/airbnb-engineering/rearchitecting-airbnbs-frontend-5e213efc24d2
https://medium.com/airbnb-engineering/server-rendering-code-splitting-and-lazy-loading-with-react-router-v4-bfe596a6af70
https://medium.com/airbnb-engineering/operationalizing-node-js-for-server-side-rendering-c5ba718acfc9
https://medium.com/@stokedbits/adventures-in-creating-a-react-component-library-with-create-react-app-and-typescript-26d1116a7d87
