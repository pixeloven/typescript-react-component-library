import * as React from "react";
import {Menu, Input, MenuItemProps, Container} from "semantic-ui-react";

const menuStyle = {
    border: "none",
    boxShadow: "none",
    marginBottom: "1em",
    marginTop: "1em",
};

const fixedMenuStyle = {
    border: "none",
    boxShadow: "none",
};

// TODO Move
export type MenuItem = {
    name: string;
    path: string;
    exact?: boolean;
};

interface DefaultProps {
    as: string;
    enableSearch: boolean;
}

interface Props {
    as?: any;
    enableSearch?: boolean;
    fixed?: boolean;
    items: MenuItem[];
    currentPath: string;
}

interface State {
    activeItem?: string;
}

// TODO redo tests and implementation
// TODO handle mobile and remove sidebar menu
// TODO should add redux form for the search?
class HeaderMenu extends React.PureComponent<Props, State> {

    public static defaultProps: DefaultProps = {
        as: 'a',
        enableSearch: false,
    };

    public state: State = {
        activeItem: '',
    };

    public handleItemClick = (event: React.MouseEvent<HTMLAnchorElement>, item: MenuItemProps): void => {
        this.setState({
            activeItem: item.name
        });
    }

    public componentDidMount(): void {
        const {items, currentPath} = this.props;
        const activeItem = items.filter((item: MenuItem) => {
            return (item.exact) ? currentPath === item.path : currentPath.startsWith(item.path);
        }).pop();
        this.setState({
            activeItem: activeItem ? activeItem.name : '',
        });
    }

    public render(): React.ReactNode {
        const {as, enableSearch, fixed, items} = this.props;
        const {activeItem} = this.state;
        const menuStyles = fixed
            ? fixedMenuStyle
            : menuStyle;
        return(
            <Menu
                borderless
                style={menuStyles}
                {...fixed && { fixed: "top" }}
            >
                <Container text>
                    {items.map((item: MenuItem, index: number) => {
                        return (<div key={index}>
                            <Menu.Item
                                as={as}
                                to={item.path}
                                name={item.name}
                                active={activeItem === item.name}
                                onClick={this.handleItemClick}
                            />
                        </div>);
                    })}
                    {enableSearch &&
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Input icon="search" placeholder="Search..." />
                        </Menu.Item>
                    </Menu.Menu>}
                </Container>
            </Menu>
        );
    }
}

export default HeaderMenu;
