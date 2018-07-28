/* tslint:disable no-var-requires */
const withReadme = (require("storybook-readme/with-readme") as any).default;
const BlogTitleReadme = require("./README.md");

import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import BlogTitle from "./BlogTitle";

storiesOf("BlogTitle", module)
    .addDecorator(withReadme(BlogTitleReadme))
    .addDecorator(withKnobs)
    .add("default", () => {
        return (
            <BlogTitle />
        );
    });
