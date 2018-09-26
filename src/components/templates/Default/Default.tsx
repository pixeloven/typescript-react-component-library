import * as React from "react";
import {Container, Icon, Responsive, Segment, Visibility} from "semantic-ui-react";
import {MainMenu, MenuItem} from "src/components/molecules";

interface Props {
    children: React.ReactNode;
    menuItems: MenuItem[];
}

interface State {
    fixedTopMenu: boolean;
}

class Default extends React.PureComponent<Props, State> {

    public state: State = {
        fixedTopMenu: false,
    };

    public stickMainMenu = (): void => {
        this.setState({ fixedTopMenu: true });
    }

    public unStickMainMenu = (): void => {
        this.setState({ fixedTopMenu: false });
    }

    public render(): React.ReactNode {
        const { children, menuItems } = this.props;
        const { fixedTopMenu } = this.state;
        return (
            <Responsive>
                <Container fluid={true}>
                    <Visibility
                        onBottomPassed={this.stickMainMenu}
                        onBottomVisible={this.unStickMainMenu}
                        once={false}
                    >
                        <MainMenu currentPath={""} items={menuItems} fixed={fixedTopMenu}/>
                    </Visibility>
                </Container>
                <Container fluid={true}>
                    {children}
                </Container>
                <Container fluid={true}>
                    <Segment inverted={true} vertical={true} textAlign="center">
                        <p>Powered with <Icon name="heart" /> by PixelOven</p>
                    </Segment>
                </Container>
            </Responsive>
        );
    }
}

export default Default;
