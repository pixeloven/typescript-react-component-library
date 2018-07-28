import { render, configure } from "enzyme";
import "jest";
import * as React from "react";
import SidebarMenu from "./SidebarMenu";

// Configure enzyme with react 16 adapter
const Adapter: any = require("enzyme-adapter-react-16");
configure({ adapter: new Adapter() });

const items = [
    { name: "Home", path: "/", exact: true },
    { name: "About", path: "/about/", exact: true },
    { name: "Blog", path: "/blog/", exact: false },
];

describe("SidebarMenu component", () => {
    it("should render correctly", () => {

        const wrapper = render(<SidebarMenu pathname="/" items={items} visible={true} />);
        expect(wrapper).toMatchSnapshot();
    });
});
