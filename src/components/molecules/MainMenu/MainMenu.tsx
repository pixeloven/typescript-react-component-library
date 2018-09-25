import * as React from "react";
import {Container, Input, Menu} from "semantic-ui-react";
import {MenuItem, MenuItemArray} from "src/components/molecules";

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

class MainMenu extends React.Component<Props> {

    public static defaultProps: DefaultProps = {
        as: "a",
        enableSearch: false,
    };

    public componentDidMount(): void {
        const {items, currentPath} = this.props;
        const activeItem = items.filter((item: MenuItem) => {
            return (item.exact) ? currentPath === item.path : currentPath.startsWith(item.path);
        }).pop();
        this.setState({
            activeItem: activeItem ? activeItem.name : "",
        });
    }

    public renderSearch(): React.ReactNode {
        const {enableSearch} = this.props;
        return enableSearch ? (
            <Menu.Menu position="right">
                <Menu.Item>
                    <Input icon="search" placeholder="Search..." />
                </Menu.Item>
            </Menu.Menu>
        ) : null;
    }

    public render(): React.ReactNode {
        const {as, fixed, items} = this.props;
        const menuStyles = fixed
            ? fixedMenuStyle
            : menuStyle;
        const searchMenuItem = this.renderSearch();
        return(
            <Menu
                borderless={true}
                style={menuStyles}
                {...fixed && { fixed: "top" }}
            >
                <Container text={true}>
                    <MenuItemArray as={as} items={items} />
                    {searchMenuItem}
                </Container>
            </Menu>
        );
    }
}

export default MainMenu;
