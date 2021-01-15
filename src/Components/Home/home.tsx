import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import AppBar from './AppBar';
import SubmitIndex from '../../Submissions/SubmitIndex';
import CommentIndex from '../../Comments/CommentIndex';
import CommentCreate from '../../Comments/CommentIndex';
import './Home.css';
import APIURL from '../../helpers/environment';

interface Props {
    updateToken: (newToken: string) => void,
    clearToken: () => void,
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
                    <header className={"container"}>
                        <AppBar clickLogout={this.props.clearToken} updateToken={this.props.updateToken} token={this.props.token} />
                        <SubmitIndex token={this.props.token} />
                        <CommentIndex token={this.props.token} />
                    </header>
                </Router>
                
                    {/* <CardContent> */}
                        {this.state.allSubs.map(allSubs => {
                            return (
                                <div className="CardCenter">
                                    <Card key={allSubs.id} id="CardTable">
                                        <CardContent><img src={allSubs.imageUrl} width="50%" height="50%"/> </CardContent>
                                        <CardContent ><strong>{allSubs.title}</strong></CardContent>
                                        <CardContent >{allSubs.entry}</CardContent>
                                        <CardContent >{allSubs.date}</CardContent>
                                        <CommentCreate key={allSubs.id} token={this.props.token}/>
                                        {/* <CommentIndex key={allSubs.id} token={this.props.token} /> */}
                                        {/* <Button onClick={this.handleOpen} id="CreateBtn" variant="outlined" >Comment</Button> */}
                                        <hr />
                                    </Card>
                                </div>
                            )
                        })};
                
            </div>

        )
    }
}