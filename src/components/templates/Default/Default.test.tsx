import { configure, shallow } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";
import * as React from "react";
import {MenuItem} from "../../molecules/MenuItemArray/MenuItemArray";
import Default from "./Default";

configure({
    adapter: new ReactSixteenAdapter(),
});

const items: MenuItem[] = [
    { name: "Home", path: "/", exact: true },
    { name: "About", path: "/about/", exact: true },
    { name: "Blog", path: "/blog/", exact: false },
];

describe("Components", () => {
    describe("Templates", () => {
        describe("Default", () => {
            it("should render child", () => {
                const wrapper = shallow(
                    <Default menuItems={items}>
                        <div>Testing</div>
                    </Default>,
                );
                expect(wrapper.find("div").length).toBe(1);
            });
        });
    });
});
