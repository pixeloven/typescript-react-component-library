import * as React from "react";
import Link from "../../atoms/Link/Link";
import { Container, Menu, Icon } from "semantic-ui-react";

export interface MenuItemInterface {
    name: string;
    path: string;
    exact: boolean;
    icon?: string;
    inverted?: boolean;
}

interface HeaderMenuProps extends React.HTMLProps<HTMLDivElement> {
    inverted?: boolean;
    onClick?: (a: any) => void;
    items: MenuItemInterface[];
    pathname: string;
}

// TODO the Link stuff might need to be passed in like as={}
export default class HeaderMenu extends React.Component<HeaderMenuProps> {
    render() {
        const { inverted, onClick, items, pathname } = this.props;
        return (
            <Container>
                <Menu size="large" pointing={true} secondary={true} inverted={inverted}>
                    <Menu.Item as="a" className="mobile only" icon="sidebar" onClick={onClick} />
                    <Menu.Item className="mobile hidden"><Icon name="spy" size="big" /></Menu.Item>
                    {items.map((item: MenuItemInterface) => {
                        const active = (item.exact) ? pathname === item.path : pathname.startsWith(item.path);
                        return <Menu.Item
                            as={Link}
                            className="mobile hidden"
                            name={item.name}
                            to={item.path}
                            key={item.path}
                            active={active}
                        />;
                    })}
                </Menu>
            </Container>
        );
    }
}

