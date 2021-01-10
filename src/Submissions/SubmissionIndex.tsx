import React, { createRef } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import SubmissionPost from './SubmissionPost';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';

type Props = {
    updateToken: (newToken: string) => void,
    clearToken: () => void,
    token: string,
}

type State = {
    allSubs: Array<{
        title: string;
        date: string;
        entry: string;
        file: string;
    }>,
    handleopen: boolean,
}

export default class SubmissionIndex extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            allSubs: [],
            handleopen: false,
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
                console.log(this.state.allSubs)
            })
    }

    componentDidMount() {
        this.fetchSubmissions()
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
            // <div>
            //     <Dialog
            //         id="Submissions"
            //         // open={props.open}
            //         // onClose={props.handleClose}
            //         aria-labelledby="scroll-dialog-title"
            //         aria-describedby="scroll-dialog-description"
            //         >
            //         <DialogTitle >
            //             <Typography variant="h6" id="dialogTitle"><strong>The Cellar</strong></Typography>
            //         </DialogTitle>
            //         <DialogContent dividers>
            //             <DialogContentText
            //                 id="scroll-dialog-description"
            //                 ref={descriptionElementRef}
            //                 tabIndex={-1}
            //             >
            //                 {movieReviews.map(review => {
            //                     return (
            //                         <div key={submission.id}>
            //                             <Typography variant="h6" id="reviewTitle"><strong>{review.title}</strong></Typography>
            //                             <Typography id="entryText">{review.entry}</Typography>
            //                             <hr />
            //                         </div>
            //                     )
            //                 })}
            //             </DialogContentText>
            //         </DialogContent>
            //         <DialogActions id='dialogBottom'>
            //             <Grid item xs={6} id='addReviewsButton'>
            //                 <IconButton onClick={() => toggleViews()}>
            //                     <AddCircleIcon color='primary' />
            //                 </IconButton>
            //                 <Typography id='typographyText'><strong>Add Review</strong></Typography>
            //             </Grid>
            //         </DialogActions>
            //     </Dialog>
            // </div>
                <div>

                 <Router>
                     <SubmissionPost token={this.props.token} />
                </Router>
             </div>
        )
    }
}