import { shallow, configure } from "enzyme";
import "jest";
import * as React from "react";
import HeaderMenu, { MenuItem } from "./HeaderMenu";

// Configure enzyme with react 16 adapter
const Adapter: any = require("enzyme-adapter-react-16");
configure({ adapter: new Adapter() });

const items: MenuItem[] = [
    { name: "Home", path: "/", exact: true },
    { name: "About", path: "/about/", exact: true },
    { name: "Blog", path: "/blog/", exact: false },
];

describe("HeaderMenu component", () => {
    it("should nothing active", () => {
        const wrapper = shallow(
            <HeaderMenu
                items={items}
                currentPath="/plop"
            />,
        );
        expect(wrapper.find({ active: true }).length).toBe(0);
    });

    it("should have about as active (match exact)", () => {
        const wrapper = shallow(
            <HeaderMenu
                items={items}
                currentPath="/about/"
            />
        );
        expect(wrapper.find({ name: "About" }).prop("active")).toBeTruthy();
    });

    it("should have blog as active (match not exact)", () => {
        const wrapper = shallow(
            <HeaderMenu
                items={items}
                currentPath="/blog/toto"
            />,
        );
        expect(wrapper.find({ name: "Blog" }).prop("active")).toBeTruthy();
    });

    it("should be fixed to top", () => {
        const wrapper = shallow(
            <HeaderMenu
                items={items}
                currentPath="/blog/toto"
                fixed={true}
            />,
        );
        expect(wrapper.find({ fixed: "top" }).length).toBe(1);
    });
});
