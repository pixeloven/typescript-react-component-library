import HttpClient from "@shared/utils/HttpClient";
import { AxiosResponse } from "axios";
import * as React from "react";

interface State {
    lat: string;
    long: string;
}

class ApiTest extends React.Component<{}, State> {
    public getData() {
        HttpClient.get("http://api.open-notify.org/iss-now.json")
        .then((response: AxiosResponse) => {
            console.log(response.data);
            this.setState({
                lat: response.data.iss_position.latitude,
                long: response.data.iss_position.longitude,
            });
        });
    }

    public componentDidMount() {
        this.getData();
    }

    public render() {
        return (
            <div>
                <strong>International Space Station</strong>
                <div>Current Position</div>
                <ul>
                    <li>Latitude: {this.state ? this.state.lat : ""}</li>
                    <li>Longitude: {this.state ? this.state.long : ""}</li>
                </ul>
            </div>
        );
    }
}

export default ApiTest;
