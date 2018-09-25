# TypeScript React Component Library

```
warning react-scripts-ts > autoprefixer > browserslist@2.11.3: Browserslist 2 could fail on reading Browserslist >3.0 config used in other tools.
warning react-scripts-ts > babel-preset-react-app > babel-preset-env > browserslist@2.11.3: Browserslist 2 could fail on reading Browserslist >3.0 config used in other tools.
warning react-scripts-ts > css-loader > cssnano > autoprefixer > browserslist@1.7.7: Browserslist 2 could fail on reading Browserslist >3.0 config used in other tools.
warning react-scripts-ts > css-loader > cssnano > postcss-merge-rules > browserslist@1.7.7: Browserslist 2 could fail on reading Browserslist >3.0 config used in other tools.
warning react-scripts-ts > css-loader > cssnano > postcss-merge-rules > caniuse-api > browserslist@1.7.7: Browserslist 2 could fail on reading Browserslist >3.0 config used in other tools.
warning enzyme > rst-selector-parser > nearley > nomnom@1.6.2: Package no longer supported. Contact support@npmjs.com for more info.
```


### Creating a new component
First create a new component filename matching class name with extension `.tsx`.
```typescript
import * as React from "react";

interface Props {
    // ...
}

interface State {
    // ...
}

class Example extends React.Component<Props, State> {
    public render(): React.ReactNode {
        return null
    }
}

export default Example;

```
The create your test runner with file name ending with `.test.tsx`
```typescript

import { shallow, configure } from "enzyme";
import * as React from "react";
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import "jest";
import Example from "./Example";

configure({
    adapter: new ReactSixteenAdapter()
});

describe("Template", () => {
    describe("Example", () => {
        it("should render child", () => {
            const wrapper = shallow(
                <Example />
            );
            expect(wrapper.find('div').length).toBe(0);
        });
    });
});
```
#### TODO
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
