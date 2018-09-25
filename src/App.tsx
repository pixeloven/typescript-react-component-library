import * as React from "react";
import { Button } from "semantic-ui-react";
import "./assets/App.css";
import Logo from "./assets/logo.svg";
import {MenuItem} from "./components/molecules";
import {Default} from "./components/templates";

class App extends React.Component {
    public render() {
        const items: MenuItem[] = [
            { name: "Home", path: "/", exact: true },
            { name: "About", path: "/about/", exact: true },
            { name: "Blog", path: "/blog/", exact: false },
        ];
        return (
            <Default menuItems={items}>
                <div className="App">
                    <header className="App-header">
                        <img src={Logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro">
                        To get started, edit <code>src/App.tsx</code> and save to reload.
                        <Button>Press Me</Button>
                    </p>
                </div>
            </Default>
        );
    }
}

export default App;
