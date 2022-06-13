import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Grid, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton/IconButton';

import AppBar from './AppBar';
import SubmitIndex from '../Submissions/SubmitIndex';
import CommentIndex from '../Comments/CommentIndex';
import CommentCreate from '../Comments/CommentCreate';
import './Home.css';
import APIURL from '../../helpers/environment';
import { withStyles} from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classnames from 'classnames';

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
    expanded: boolean,
    classes: any,
}

const styles = (theme: any) => ({
    card: {
        maxWidth: 600,
      },
      actions: {
        display: 'flex',
      },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
      [theme.breakpoints.up('sm')]: {
        marginRight: -8,
      },
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  });

class Dashboard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            allSubs: [],
            handleopen: false,
            submissionCreate: {},
            fetchSubs: '',
            expanded: false,
            classes: '',
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

    handleExpandClick = () => {{
        this.setState(
            state => ({ expanded: !state.expanded})
        )
    }};

    render() {
        const {classes} = this.state;
        return (
            <React.Fragment>
                <Router>
                    <div className="Home">
                        <AppBar clickLogout={this.props.clearToken} updateToken={this.props.updateToken} token={this.props.token} />
                        <CommentIndex token={this.props.token} />
                        <SubmitIndex token={this.props.token} />
                    </div>
                </Router>
                <div>
                    <Grid container spacing={10} style={{padding: 24}}>
                        {this.state.allSubs.map(allSubs => {
                            return (
                                <Grid item xs={12} sm={6} lg={4} xl={4}>
                    <Card key={allSubs.id} className={classes.card} id="CardTable">
                        <CardHeader 
                            avatar={
                                <Avatar aria-label="post">CP</Avatar>
                            }
                            title="User Post"
                            subheader={allSubs.date}
                        />
                        <CardMedia><img src={allSubs.imageUrl} width="95%" height="60%" /></CardMedia>
                        <CardContent>
                            <Typography variant="body2" component="p"><strong>{allSubs.title}</strong></Typography>
                        </CardContent>
                        <CardActions className={classes.actions} disableSpacing>
                            <IconButton
                                className={classnames(classes.expand, {
                                    [classes.expandOpen]: this.state.expanded,
                                })}
                                onClick={this.handleExpandClick}
                                aria-expanded={this.state.expanded}
                                aria-label="show more"
                                >
                                <ExpandMoreIcon id="editBtn" />
                            </IconButton>
                        </CardActions>
                        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography variant="body2" component="p">{allSubs.entry}</Typography>
                            </CardContent>
                            <CommentCreate subId={allSubs.id} token={this.props.token} />
                        </Collapse>
                    </Card>
                </Grid>
                            )
                        })};
                    </Grid>
                </div>
            </React.Fragment>

        )
    }
};

export default withStyles(styles)(Dashboard);