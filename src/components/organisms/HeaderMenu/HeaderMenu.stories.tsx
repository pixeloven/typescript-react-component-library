/* tslint:disable no-var-requires */
const withReadme = (require("storybook-readme/with-readme") as any).default;
const HeaderMenuReadme = require("./README.md");

import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean, text } from "@storybook/addon-knobs";
import HeaderMenu from "./HeaderMenu";

const items = [
    { name: "Home", path: "/", exact: true },
    { name: "About", path: "/about", exact: true },
    { name: "Blog", path: "/blog", exact: false },
];

const onClickStub = (a: any) => action(a.type)(a) && a;

storiesOf("HeaderMenu", module)
    .addDecorator(withKnobs)
    .addDecorator(withReadme(HeaderMenuReadme))
    .add("default", () => {
        // 'left' | 'right' | 'bottom' | 'top'
        const value = boolean('fixed', true);
        const currentPath = text("currentPath", "/");
        return (
            <HeaderMenu
                fixed={value}
                items={items}
                currentPath={currentPath}
                onChange={onClickStub} />
        );
    });
