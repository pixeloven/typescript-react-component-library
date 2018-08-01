import * as React from "react";
import { Button, Container, Menu, MenuProps, MenuItemProps } from "semantic-ui-react";

export interface MenuItemInterface {
    name: string,
    path: string,
    exact?: boolean
}

export interface MenuInterface {
    fixed?: boolean,
    items?: MenuItemInterface[],
    currentPath?: string,
    onChange?: (event: React.SyntheticEvent) => void
}

export default class HeaderMenu extends React.Component<MenuInterface> {

    static defaultProps = {
        fixed: true,
        size: 'large',
    };

    /**
     * On click change active state
     * @param event
     * @param props
     */
    handleItemClick = (event: React.SyntheticEvent, props: MenuItemProps): void =>  {
        event.preventDefault();
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    };

    // TODO add login state
    render() {
        const { fixed, items, currentPath } = this.props;
        const menuProps: MenuProps = {
            inverted: !fixed,
            pointing: !fixed,
            secondary: !fixed
        };
        if (fixed) {
            menuProps.fixed = 'top';
        }
        return (
            <Menu {...menuProps} >
                <Container>
                    {!!items && items.map((item: MenuItemInterface) => {
                        const active = (item.exact) ? currentPath === item.path : !!currentPath && currentPath.startsWith(item.path);
                        return <Menu.Item
                            as='a'
                            className="mobile hidden"
                            name={item.name}
                            to={item.path}
                            key={item.path}
                            active={active}
                            onClick={this.handleItemClick}
                        />;
                    })}
                    <Menu.Item position='right'>
                        <Button as='a' inverted={!fixed}>
                            Log in
                        </Button>
                        <Button as='a' inverted={!fixed} primary={!!fixed} style={{ marginLeft: '0.5em' }}>
                            Sign Up
                        </Button>
                    </Menu.Item>
                </Container>
            </Menu>
        )
    }
}
