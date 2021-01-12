import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './Home.css';

import AppBar from './AppBar';
import SideDrawer from './SideDrawer';
import SubmitIndex from '../../Submissions/SubmitIndex';
import SubmitPost from '../../Submissions/SubmitPost';


interface Props {
    updateToken:(newToken: string) =>void,
    clearToken:() => void,
    token: string,
}

type State = {
    allSubs: Array<{
        id: number;
        title: string;
        date: string;
        entry: string;
        imageUrl: string;
        userId: number;
    }>,
    handleopen: boolean,
    submissionCreate: any,
    fetchSubs: any,
}

export default class SubmissionIndex extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            allSubs: [],
            handleopen: false,
            submissionCreate: {},
            fetchSubs: '',
        }
    }
    
    fetchSubmissions = () => {
        fetch('http://localhost:4000/submission/', {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    allSubs: data
                })
                console.log("response", data);
            })
    }

    componentDidMount() {
        this.fetchSubmissions();
    }

    handleOpen = () => {
        this.setState({
            handleopen: true,
        });
    };

    handleClose = () => {
        this.setState({
            handleopen: false,
        });
    };

    render() {
        return (
            <div className="Home">
                <Router>
                    <header className="container">
                        <SideDrawer clickLogout={this.props.clearToken} updateToken={this.props.updateToken} token={this.props.token}/>
                        {/* <SubmitIndex token={this.props.token} /> */}
                    </header>
                </Router>
                <Box component="span" display="block" p={1} m={1} bgcolor="background.paper">
                    {this.state.allSubs.map(allSubs => {
                        return (
                            <div key={allSubs.id}>
                                <Typography variant="h6" id="reviewTitle"><strong>{allSubs.title}</strong></Typography>
                                <Typography id="entryText">{allSubs.entry}</Typography>
                                <Typography id="entryDate">{allSubs.date}</Typography>
                                <img src={allSubs.imageUrl} width="50%" height="50%"/>
                                <hr />
                            </div>
                        )
                    })};
                </Box>
            
            </div>
               
        )
    }
}