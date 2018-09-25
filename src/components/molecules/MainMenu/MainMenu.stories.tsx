/* tslint:disable no-var-requires */
const withReadme = (require("storybook-readme/with-readme") as any).default;
const readme = require("./README.md");

import { boolean, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import {MainMenu, MenuItem} from "src/components/molecules";

const items: MenuItem[] = [
    { name: "Home", path: "/", exact: true },
    { name: "About", path: "/about/", exact: true },
    { name: "Blog", path: "/blog/", exact: false },
];

storiesOf("Components/Organisms/MainMenu", module)
    .addDecorator(withReadme(readme))
    .add("default", () => {
        const value = boolean("fixed", true);
        const currentPath = text("currentPath", "/");
        return (
            <MainMenu
                fixed={value}
                items={items}
                currentPath={currentPath}
            />
        );
    });
