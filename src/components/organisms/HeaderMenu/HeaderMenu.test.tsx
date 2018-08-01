import { shallow, configure } from "enzyme";
import "jest";
import * as React from "react";
import HeaderMenu from "./HeaderMenu";

// Configure enzyme with react 16 adapter
const Adapter: any = require("enzyme-adapter-react-16");
configure({ adapter: new Adapter() });

const items = [
    { name: "Home", path: "/", exact: true },
    { name: "About", path: "/about/", exact: true },
    { name: "Blog", path: "/blog/", exact: false },
];

const onClickStub = (a: any) => a;

describe("HeaderMenu component", () => {
    it("should nothing active", () => {
        const wrapper = shallow(
            <HeaderMenu
                items={items}
                currentPath="/plop"
                onChange={onClickStub}
            />,
        );
        expect(wrapper.find({ active: true }).length).toBe(0);
    });

    it("should have about as active (match exact)", () => {
        const wrapper = shallow(
            <HeaderMenu
                items={items}
                currentPath="/about/"
                onChange={onClickStub} />,
        );
        expect(wrapper.find({ name: "About" }).prop("active")).toBeTruthy();
    });

    it("should have blog as active (match not exact)", () => {
        const wrapper = shallow(
            <HeaderMenu
                items={items}
                currentPath="/blog/toto"
                onChange={onClickStub}
            />,
        );
        expect(wrapper.find({ name: "Blog" }).prop("active")).toBeTruthy();
    });

    it("should be fixed to top", () => {
        const wrapper = shallow(
            <HeaderMenu
                items={items}
                currentPath="/blog/toto"
                onChange={onClickStub}
                fixed={true}
            />,
        );
        expect(wrapper.find({ inverted: "top" }).length).toBe(1);
    });

    it("should dispatch the correct message on burger click", () => {
        const onClickMock: any = jest.fn();
        const wrapper = shallow(
            <HeaderMenu
                items={items}
                currentPath=""
                onChange={onClickMock} />,
        );
        wrapper.find({ name: "Blog" }).simulate("click");
        expect(onClickMock.mock.calls.length).toBe(1);
    });

});
