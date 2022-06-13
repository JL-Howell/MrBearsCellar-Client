import React from 'react';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Grid, Typography } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import IconButton from '@material-ui/core/IconButton/IconButton';
import'./Style.css';
import APIURL from '../../helpers/environment';
import { withStyles} from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classnames from 'classnames';

type Props = {
    mySubs: Array<{
        id: number;
        title: string;
        date: string;
        entry: string;
        imageUrl: string;
    }>,
    editUpdateSubmits: (submission: any) => void,
    updateOn: () => void,
    fetchSubs: () => void,
    token: string
    classes: any,
}

type State = {
    expanded: boolean;
}

const styles = (theme: any) => ({
    card: {
        maxWidth: 600,
        maxHeight: 600,
      },
      actions: {
        display: 'block',
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

class submissionTable extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            expanded: false,
        }
    };

    submissionDelete = (submission: any) => {
        fetch(`${APIURL}/submission/delete/${submission.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(() => this.props.fetchSubs())
    }

    handleExpandClick = () => {{
        this.setState(
            state => ({ expanded: !state.expanded})
        )
    }};
  
    render () {
        const {classes} = this.props;
        return (
            <div>
            <Grid container spacing={10} style={{padding: 24}}>
            {this.props.mySubs
            ? this.props.mySubs.map((mySubs) => (
                <Grid item xs={12} sm={6} lg={4} xl={4}>
                    <Card key={mySubs.id} className={classes.card} id="CardTable">
                        <CardHeader 
                            avatar={
                                <Avatar aria-label="post">CP</Avatar>
                            }
                            title="User Post"
                            subheader={mySubs.date}
                        />
                        <CardMedia><img src={mySubs.imageUrl} width="95%" height="60%" /></CardMedia>
                        <CardContent>
                            <Typography variant="body2" component="p"><strong>{mySubs.title}</strong></Typography>
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
                                <Typography variant="body2" component="p">{mySubs.entry}</Typography>
                            </CardContent>
                            <CardContent>
                                <IconButton id="editBtn" onClick={() => { this.props.editUpdateSubmits(mySubs); this.props.updateOn() }}><BorderColorOutlinedIcon /></IconButton>
                                <IconButton id="deleteBtn" onClick={() => { this.submissionDelete(mySubs)}} ><DeleteOutlineIcon /></IconButton>
                                <br />
                            </CardContent>
                        </Collapse>
                    </Card>
                </Grid>
                ))
                : undefined} 

            </Grid>
            </div>
                
        )
    }
};

export default withStyles(styles)(submissionTable);

