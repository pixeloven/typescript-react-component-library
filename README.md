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
