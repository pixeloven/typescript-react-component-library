import * as React from "react";

const ringStyles = {

};

export interface RingProps extends React.HTMLProps<HTMLDivElement> {
    to: string;
    children?: React.ReactNode
}

// TODO find a way to hook into this
export default class Ring extends React.PureComponent<RingProps> {
    render() {
        return (
            <div style={ringStyles}/>
        );
    }
}
