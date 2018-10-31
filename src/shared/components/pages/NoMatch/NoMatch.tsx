import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import {Container, Grid, Segment} from "semantic-ui-react";

class NoMatch extends React.Component<RouteComponentProps> {
    public render(): React.ReactNode {
        return (
            <Grid.Row>
                <Grid.Column>
                    <Segment inverted={true} vertical={true} textAlign="center">
                        <Container>
                            <h1 style={{fontSize: 100}}>404</h1>
                        </Container>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        );
    }
}

export default NoMatch;
