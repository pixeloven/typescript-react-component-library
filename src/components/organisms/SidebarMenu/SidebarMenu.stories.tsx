/* tslint:disable no-var-requires */
const withReadme = (require("storybook-readme/with-readme") as any).default;
const readme = require("./README.md");

import * as React from "react";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs";
import SidebarMenu from "./SidebarMenu";

const items = [
    { name: "Home", path: "/", exact: true, icon: "home" },
    { name: "About", path: "/about/", exact: true, icon: "info circle" },
    { name: "Blog", path: "/blog/", exact: false, icon: "newspaper" },
];

storiesOf("SidebarMenu", module)
    .addDecorator(withReadme(readme))
    .add("default", () => {
        const pathname = text("pathname", "/");

        return (
            <SidebarMenu items={items} pathname={pathname} visible={true} />
        );
    });
