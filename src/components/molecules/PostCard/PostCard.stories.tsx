/* tslint:disable no-var-requires */
const withReadme = (require("storybook-readme/with-readme") as any).default;
const Readme = require("./README.md");

import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import PostCard, { PostInterface } from "./PostCard";

storiesOf("PostCard", module)
    .addDecorator(withReadme(Readme))
    .addDecorator(withKnobs)
    .add("default", () => {
        // TODO replace example
        const post: PostInterface = {
            cover: 'http://s4782.pcdn.co/wp-content/uploads/2012/08/ivs_59153266.jpg',
            title: 'Awesome Blog Post',
            excerpt: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
            slug: '/awesome',
            author: {
                name: 'Brian Gebel',
            },
            meta: {
                updatedDate: 'May 25th, 2018',
                timeToRead: 0
            }
        };
        return (
            <PostCard post={post} />
        );
    });
