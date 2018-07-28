import { shallow, configure } from "enzyme";
import "jest";
import * as React from "react";
import TagsCard, { TagInterface } from "./TagsCard";

import { List } from "semantic-ui-react";

// Configure enzyme with react 16 adapter
const Adapter: any = require("enzyme-adapter-react-16");
configure({ adapter: new Adapter() });

describe("TagsCard component", () => {
  let LinkStub: any;

  beforeEach(() => {
    LinkStub = (props: any) =>
      <div>{props.children}</div>;
  });

  it("should list all the tags", () => {
    const tags = [
      { value: "tag01", count: 2 },
      { value: "tag02", count: 4 },
      { value: "tag03", count: 6 },
    ] as TagInterface[];

    const wrapper = shallow(<TagsCard tags={tags} Link={LinkStub} />);

    expect(wrapper.find(List.Item)).toHaveLength(3);
  });

  it("should have on tag active", () => {
    const tags = [
      { value: "tag01", count: 2 },
      { value: "tag02", count: 4 },
      { value: "tag03", count: 6 },
    ] as TagInterface[];

    const wrapper = shallow(<TagsCard tags={tags} Link={LinkStub} tag="tag01"/>);

    expect(wrapper).toMatchSnapshot();
  });
});
