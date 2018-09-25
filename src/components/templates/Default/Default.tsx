import * as React from "react";
import {Container, Icon, Responsive, Segment, Visibility} from "semantic-ui-react";
import MainMenu from "src/components/molecules/MainMenu/MainMenu";
import {MenuItem} from "src/components/molecules/MenuItemArray/MenuItemArray";

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
                <Segment vertical={true} style={{ border: 0 }}>
                    <Visibility
                        onBottomPassed={this.stickMainMenu}
                        onBottomVisible={this.unStickMainMenu}
                        once={false}
                    >
                        <MainMenu currentPath={""} items={menuItems} fixed={fixedTopMenu}/>
                    </Visibility>
                </Segment>
                <Segment vertical={true} style={{ border: 0 }}>
                    {children}
                </Segment>
                <Segment inverted={true} vertical={true} style={{ position: "absolute", bottom: 0, width: "100%" }}>
                    <Container textAlign="center">
                        <p>Powered with <Icon name="heart" /> by PixelOven</p>
                    </Container>
                </Segment>
            </Responsive>
        );
    }
}

export default Default;
