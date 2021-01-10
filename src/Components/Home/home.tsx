import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './Home.css';

import AppBar from './AppBar';
import SubmissionIndex from '../../Submissions/SubmissionIndex';

interface Props {
    updateToken:(newToken: string) =>void,
    clearToken:() => void,
    token: string,
}

export default class Home extends React.Component<Props> {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <div className="container">
                        <AppBar clickLogout={this.props.clearToken} updateToken={this.props.updateToken} token={this.props.token}/>
                        <SubmissionIndex clearToken={this.props.clearToken} updateToken={this.props.updateToken} token={this.props.token} />
                    </div>
                </Router>
            </React.Fragment>
        )
    };
};