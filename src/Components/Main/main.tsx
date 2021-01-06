import React from 'react';
import AppBar from './AppBar';

type homeProps = {
    clickLogout: () => void;
    token: string;
}

export default class Home extends React.Component<homeProps> {
    render() {
        return (
            <div>
                <AppBar onClick={this.props.clickLogout} token={this.props.token} />
            </div>
        )
    }
};