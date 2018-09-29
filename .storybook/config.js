import { configure, addDecorator } from "@storybook/react";
import { setOptions } from "@storybook/addon-options";
import { withKnobs } from "@storybook/addon-knobs/react";
import '../src/shared/assets/semantic.css';
import './index.css';

setOptions({
    name: 'TypeScript React',
    goFullScreen: false,
    showLeftPanel: true,
    showDownPanel: true,
    showSearchBox: false,
    downPanelInRight: true
});
addDecorator(withKnobs);

// Stories loader
const req = require.context("../src/shared/components", true, /.stories.[jt]sx?$/);
function loadStories() {
    req.keys().forEach(req);
}

// Initialize react-storybook
configure(loadStories, module);
