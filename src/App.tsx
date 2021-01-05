import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './Components/home/Navbar';
import Home from './Components/home';
import Auth from './Components/auth';


type tokenState = {
    sessionToken: string | null;
    submits: any; 
    comments: any;
    userId: number;
    role: 'user' | 'admin';
}

export default class App extends React.Component<{}, tokenState> {
    constructor(props: any) {
        super(props);
        this.state = {
            sessionToken: '',
            submits: {},
            comments: {},
            userId: 0,
            role: 'user',
        }
    }

    componentWillMount() {
        if(localStorage.getItem('token')) {
            this.setState({
                sessionToken: localStorage.getItem('token')
            });
        }
    };
        
    updateToken(newToken: string) {
        localStorage.setItem('token', newToken);
        this.setState({
            sessionToken: newToken
        });
    }

    clearToken() {
        localStorage.clear();
        this.setState({
            sessionToken: ''
        })
    }
    logout = () => {
        localStorage.clear();
        this.setState({
            sessionToken: ''
        })
    }

    render() {
        <Router>
            <Home clickLogout={this.clearToken.bind(this)} token={this.state.sessionToken} />
        </Router>
        const protectedViews = !this.state.sessionToken ? <Auth setToken={this.updateToken}/> : <Home logout={this.logout}/>
        return (
            <div>
                <NavBar />
                {protectedViews}
            </div>
        );
    }
}