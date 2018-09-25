/* tslint:disable no-var-requires */
const withReadme = (require("storybook-readme/with-readme") as any).default;
const readme = require("./README.md");

import { storiesOf } from "@storybook/react";
import * as React from "react";
import Example from "./Example";

storiesOf("Components/Atoms/Example", module)
    .addDecorator(withReadme(readme))
    .add("default", () => {
        return (
            <Example />
        );
    });
