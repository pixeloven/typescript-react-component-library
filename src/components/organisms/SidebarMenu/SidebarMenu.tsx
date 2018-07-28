import * as React from "react";
import { Menu, Sidebar } from "semantic-ui-react";
import Link from "../../atoms/Link/Link";

// TODO consolidate with HeaderMenu
export interface MenuItemInterface {
    name: string;
    path: string;
    exact: boolean;
    icon?: string;
    inverted?: boolean;
}

interface SidebarMenuProps extends React.HTMLProps<HTMLDivElement> {
    visible?: boolean;
    items: MenuItemInterface[];
    pathname: string;
}

export default class SidebarMenu extends React.Component<SidebarMenuProps> {
    render() {
        // TODO move these to class methods
        const { items, pathname, visible } = this.props;
        const isActive = (item: MenuItemInterface) => (item.exact) ? pathname === item.path : pathname.startsWith(item.path);
        const activeItem = items.find((item: MenuItemInterface) => isActive(item)) || {} as MenuItemInterface;
        return(
            <Sidebar as={Menu} animation="slide along" width="thin"
                     visible={visible} icon="labeled" vertical={true} inverted={activeItem.inverted}>
                {items.map((item: MenuItemInterface) => {
                    const active = isActive(item);
                    return (
                        <Menu.Item as={Link} to={item.path} active={active} key={item.path}>
                            {/*<Icon name={item.icon} />*/}
                            {item.name}
                        </Menu.Item>
                    );
                })}
            </Sidebar>
        );
    }
}

