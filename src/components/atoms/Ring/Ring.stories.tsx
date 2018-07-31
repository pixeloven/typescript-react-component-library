/* tslint:disable no-var-requires */
const withReadme = (require("storybook-readme/with-readme") as any).default;
const BlogPaginationReadme = require("./README.md");

import * as React from "react";
import { storiesOf } from "@storybook/react";
import {withKnobs, text} from "@storybook/addon-knobs";
import Ring from "./Ring";

storiesOf("Ring", module)
    .addDecorator(withReadme(BlogPaginationReadme))
    .addDecorator(withKnobs)
    .add("default", () => {
        const status = text("status", 'success');
        return (
            <Ring status={status}/>
        );
    });
