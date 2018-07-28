import * as React from "react";

export interface LinkProps extends React.HTMLProps<HTMLDivElement> {
    to: string;
    children?: React.ReactNode
}

// TODO find a way to hook into this
export default class Link extends React.PureComponent<LinkProps> {
    render() {
        return (
            <a href={this.props.to}>
                {this.props.children}
            </a>
        );
    }
}
