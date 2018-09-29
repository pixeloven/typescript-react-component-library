import * as React from "react";
import {Menu, MenuItemProps} from "semantic-ui-react";

export interface MenuItem {
    name: string;
    path: string;
    active?: boolean;
}

interface Props {
    as: string | React.Component | React.PureComponent | React.StatelessComponent;
    items: MenuItem[];
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>, name?: string) => void;
}

class MenuItemArray extends React.PureComponent<Props> {

    public handleItemClick = (event: React.MouseEvent<HTMLAnchorElement>, item: MenuItemProps): void => {
        const {onClick} = this.props;
        if (onClick) {
            onClick(event, item.name);
        }
    }

    public render(): React.ReactNode {
        const {as, items} = this.props;
        return items.map((item: MenuItem, index: number) => {
            return (
                <Menu.Item
                    key={index}
                    as={as}
                    to={item.path}
                    name={item.name}
                    active={item.active}
                    onClick={this.handleItemClick}
                />
            );
        });
    }
}

export default MenuItemArray;
