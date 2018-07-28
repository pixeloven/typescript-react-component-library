/* tslint:disable no-var-requires */
const withReadme = (require("storybook-readme/with-readme") as any).default;
const SidebarMenuReadme = require("./README.md");

import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";
import SidebarMenu from "./SidebarMenu";

const items = [
    { name: "Home", path: "/", exact: true, icon: "home" },
    { name: "About", path: "/about/", exact: true, icon: "info circle" },
    { name: "Blog", path: "/blog/", exact: false, icon: "newspaper" },
];

storiesOf("SidebarMenu", module)
    .addDecorator(withKnobs)
    .addDecorator(withReadme(SidebarMenuReadme))
    .add("default", () => {
        const pathname = text("pathname", "/");

        return (
            <SidebarMenu items={items} pathname={pathname} visible={true} />
        );
    });
