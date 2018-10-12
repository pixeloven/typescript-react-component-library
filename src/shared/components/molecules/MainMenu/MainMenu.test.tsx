import { configure, shallow } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";
import * as React from "react";
import {MainMenu, MenuItem} from "../";

configure({
    adapter: new ReactSixteenAdapter(),
});

const items: MenuItem[] = [
    { name: "Home", path: "/", active: true },
    { name: "About", path: "/about/", active: false },
    { name: "Blog", path: "/blog/", active: false },
];

describe("Components", () => {
    describe("Organisms", () => {
        describe("MainMenu", () => {
            it("should nothing active", () => {
                const wrapper = shallow(
                    <MainMenu
                        items={items}
                    />,
                );
                expect(wrapper.find({ active: true }).length).toBe(0);
            });

            it("should have about as active (match exact)", () => {
                const wrapper = shallow(
                    <MainMenu
                        items={items}
                    />,
                );
                expect(wrapper.find({ name: "About" }).prop("active")).toBeTruthy();
            });

            it("should have blog as active (match not exact)", () => {
                const wrapper = shallow(
                    <MainMenu
                        items={items}
                    />,
                );
                expect(wrapper.find({ name: "Blog" }).prop("active")).toBeTruthy();
            });

            it("should be fixed to top", () => {
                const wrapper = shallow(
                    <MainMenu
                        items={items}
                        fixed={true}
                    />,
                );
                expect(wrapper.find({ fixed: "top" }).length).toBe(1);
            });
        });
    });
});
