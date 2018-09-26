import * as React from "react";
import {Container, Grid, Header, Image, Segment} from "semantic-ui-react";
import "./assets/App.css";
import Logo from "./assets/logo.svg";
import {MenuItem} from "./components/molecules";
import {Default} from "./components/templates";

class App extends React.Component {
    public render() {
        // TODO get from router
        // TODO need better way to do the exact path thing... react router might have a way to do this
        const items: MenuItem[] = [
            { name: "Home", path: "/", exact: true },
            { name: "About", path: "/about/", exact: true },
            { name: "Blog", path: "/blog/", exact: false },
        ];
        return (
            <Default menuItems={items}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment inverted={true} vertical={true} textAlign="center">
                                <Container>
                                    <Image
                                        className="app-logo"
                                        src={Logo}
                                    />
                                    <Header as="h1" inverted={true}>Welcome to TypeScript + React</Header>
                                    <p>Also includes Semantic UI React, Redux and much more!</p>
                                </Container>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid container={true} divided="vertically">
                    <Grid.Row>
                        <Grid.Column>
                            <Header as="h2">Atomic Design</Header>
                            <p>Popularly known within the design world, Atomic Design helps to build consistent, solid and reusable design systems. Plus, in the world of React, Vue and frameworks that stimulate the componentization, Atomic Design is used unconsciously; but when used in the right way, it becomes a powerful ally for developers.</p>
                            <p>The name Atomic Design comes from the idea of separating the components in atoms, molecules, organisms, templates and pages, like in the image above. But what are the responsibilities of each separated part?</p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Header as="h3">Atoms</Header>
                        </Grid.Column>
                        <Grid.Column>
                            <p>Atoms are the smallest possible components, such as buttons, titles, inputs or event color pallets, animations, and fonts. They can be applied on any context, globally or within other components and templates, besides having many states, such as this example of button: disabled, hover, different sizes, etc.</p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Header as="h3">Molecules</Header>
                        </Grid.Column>
                        <Grid.Column>
                            <p>They are the composition of one or more components of atoms. Here we begin to compose complex components and reuse some of those components. Molecules can have their own properties and create functionalities by using atoms, which don’t have any function or action by themselves.</p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Header as="h3">Organisms</Header>
                        </Grid.Column>
                        <Grid.Column>
                            <p>Organisms are the combination of molecules that work together or even with atoms that compose more elaborate interfaces. At this level, the components begin to have the final shape, but they are still ensured to be independent, portable and reusable enough to be reusable in any content.</p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Default>
        );
    }
}

export default App;
