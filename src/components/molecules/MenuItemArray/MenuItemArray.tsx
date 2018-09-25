import * as React from "react";
import {Menu, MenuItemProps} from "semantic-ui-react";

export interface MenuItem {
    name: string;
    path: string;
    exact?: boolean;
}

interface Props {
    as: any;
    items: MenuItem[];
}

interface State {
    activeItem?: string;
}

class MenuItemArray extends React.PureComponent<Props, State> {

    public state: State = {
        activeItem: "",
    };

    public handleItemClick = (event: React.MouseEvent<HTMLAnchorElement>, item: MenuItemProps): void => {
        this.setState({
            activeItem: item.name,
        });
    }

    public render(): React.ReactNode {
        const {as, items} = this.props;
        const {activeItem} = this.state;
        return items.map((item: MenuItem, index: number) => {
            return (
                <div key={index}>
                    <Menu.Item
                        as={as}
                        to={item.path}
                        name={item.name}
                        active={activeItem === item.name}
                        onClick={this.handleItemClick}
                    />
                </div>
            );
        });
    }
}

export default MenuItemArray;
