import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

class NoMatch extends React.Component<RouteComponentProps> {
    public render(): React.ReactNode {
        return (
            <div>
                Four Oh Four
            </div>
        );
    }
}

export default NoMatch;
