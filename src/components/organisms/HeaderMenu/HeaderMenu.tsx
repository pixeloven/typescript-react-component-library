import * as React from "react";
import { Button, Container, Menu, MenuProps, MenuItemProps } from "semantic-ui-react";

export interface MenuItemInterface extends MenuItemProps {
    exact?: boolean,
    path: string
}

export interface MenuInterface extends MenuProps {
    currentPath?: string,
    onChange?: (event: React.SyntheticEvent) => void
}

export default class HeaderMenu extends React.Component<MenuInterface> {

    static defaultProps = {
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

    render() {
        const { fixed, size, items, currentPath } = this.props;
        return (
            <Menu
                fixed={fixed}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size={size}
            >
                <Container>
                    {!!items && items.map((item: MenuItemInterface) => {
                        console.log(currentPath);
                        console.log(item.path);
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
