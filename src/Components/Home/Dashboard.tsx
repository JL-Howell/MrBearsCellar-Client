import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import AppBar from './AppBar';
import SubmitIndex from '../Submissions/SubmitIndex';
import CommentIndex from '../Comments/CommentIndex';
import CommentCreate from '../Comments/CommentCreate';
import './Home.css';
import APIURL from '../../helpers/environment';

interface Props {
    updateToken: (newToken: string) => void;
    clearToken: () => void;
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
        fetch(`${APIURL}/submission/`, {
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
        console.log('props: ', this.props)
        console.log('state: ', this.state)
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
            <React.Fragment>
                <Router>
                    <div className="Home">
                        <AppBar clickLogout={this.props.clearToken} updateToken={this.props.updateToken} token={this.props.token} />
                        <CommentIndex token={this.props.token} />
                        <SubmitIndex token={this.props.token} />
                    </div>
                </Router>
                <div className="CardCenter">
                    <Grid container spacing={8} style={{padding: 14}}>
                        {this.state.allSubs.map(allSubs => {
                            return (
                                <Grid item xs={12} sm={6} lg={4} xl={4}>
                                <Card key={allSubs.id} id="CardTable">
                                    <CardContent><img src={allSubs.imageUrl} width="50%" height="50%"/> </CardContent>
                                    <CardContent ><strong>{allSubs.title}</strong></CardContent>
                                    <CardContent >{allSubs.entry}</CardContent>
                                    <CardContent >{allSubs.date}</CardContent>
                                    <CommentCreate subId={allSubs.id} token={this.props.token} />
                                </Card>
                                </Grid>
                            )
                        })};
                    </Grid>
                </div>
            </React.Fragment>

        )
    }
}