const withReadme = (require("storybook-readme/with-readme") as any).default;
const TagsCardReadme = require("./README.md");

import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, select } from "@storybook/addon-knobs";
import TagsCard, {TagInterface} from "./TagsCard";

const tags = [
    { value: "tag01", count: 2 },
    { value: "tag02", count: 4 },
    { value: "tag03", count: 6 },
] as TagInterface[];

const LinkStub = ((props: any) =>
    <div onClick={action(props.to.toString())} >{props.children}</div>) as any;

storiesOf("TagsCard", module)
    .addDecorator(withReadme(TagsCardReadme))
    .addDecorator(withKnobs)
    .add("default", () => {
        return <TagsCard tags={tags} Link={LinkStub} />;
    })
    .add("with tag property", () => {
        const tag = select("Tag", tags.map((t) => t.value), "tag01");
        return <TagsCard tags={tags} tag={tag} Link={LinkStub} />;
    });
