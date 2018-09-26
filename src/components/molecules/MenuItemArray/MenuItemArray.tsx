import * as React from "react";
import {Menu, MenuItemProps} from "semantic-ui-react";

export interface MenuItem {
    name: string;
    path: string;
    active?: boolean;
}

interface Props {
    as: any;
    items: MenuItem[];
}

class MenuItemArray extends React.PureComponent<Props> {

    public handleItemClick = (event: React.MouseEvent<HTMLAnchorElement>, item: MenuItemProps): void => {
        console.log("woot");
    }

    public render(): React.ReactNode {
        const {as, items} = this.props;
        return items.map((item: MenuItem, index: number) => {
            return (
                <div key={index}>
                    <Menu.Item
                        as={as}
                        to={item.path}
                        name={item.name}
                        active={item.active}
                        onClick={this.handleItemClick}
                    />
                </div>
            );
        });
    }
}

export default MenuItemArray;
