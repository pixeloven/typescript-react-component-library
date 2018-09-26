/* tslint:disable no-var-requires */
const withReadme = (require("storybook-readme/with-readme") as any).default;
const readme = require("./README.md");

import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import {MainMenu, MenuItem} from "src/components/molecules";

const items: MenuItem[] = [
    { name: "Home", path: "/", active: true },
    { name: "About", path: "/about", active: false },
    { name: "Blog", path: "/blog", active: false },
];

storiesOf("Components/Organisms/MainMenu", module)
    .addDecorator(withReadme(readme))
    .add("default", () => {
        const value = boolean("fixed", true);
        return (
            <MainMenu
                fixed={value}
                items={items}
            />
        );
    });
