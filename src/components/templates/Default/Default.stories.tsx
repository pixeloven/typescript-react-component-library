/* tslint:disable no-var-requires */
const withReadme = (require("storybook-readme/with-readme") as any).default;
const readme = require("./README.md");

import { storiesOf } from "@storybook/react";
import * as React from "react";
import {MenuItem} from "src/components/molecules";
import Default from "./Default";

const items: MenuItem[] = [
    { name: "Home", path: "/", exact: true },
    { name: "About", path: "/about/", exact: true },
    { name: "Blog", path: "/blog/", exact: false },
];

storiesOf("Components/Templates/Default", module)
    .addDecorator(withReadme(readme))
    .add("default", () => {
        return (
            <Default menuItems={items}>
                <div>Showing Default Template</div>
            </Default>
        );
    });
