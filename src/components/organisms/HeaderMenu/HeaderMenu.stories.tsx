/* tslint:disable no-var-requires */
const withReadme = (require("storybook-readme/with-readme") as any).default;
const readme = require("./README.md");

import * as React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";
import HeaderMenu, {MenuItem} from "./HeaderMenu";

const items: MenuItem[] = [
    { name: "Home", path: "/", exact: true },
    { name: "About", path: "/about/", exact: true },
    { name: "Blog", path: "/blog/", exact: false },
];

storiesOf('HeaderMenu', module)
    .addDecorator(withReadme(readme))
    .add('default', () => {
        const value = boolean('fixed', true);
        const currentPath = text("currentPath", "/");
        return (
            <HeaderMenu
                fixed={value}
                items={items}
                currentPath={currentPath}
            />
        );
    });

