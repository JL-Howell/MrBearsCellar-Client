import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Box,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton/IconButton';


type Props = {
    fetchComments: () => void,
    updateOff: () => void,
    token: string,
    commentUpdate: any,
}

type State = {
    username: string;
    date: string;
    entry: string;
    rating: number;
    handleopen: boolean,

}

export default class CommentEdit extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            username: this.props.commentUpdate.username,
            date: this.props.commentUpdate.date,
            entry: this.props.commentUpdate.entry,
            rating: this.props.commentUpdate.rating,
            handleopen: false,

        }
    }

    handleUpdate = (event: any) => {
        event.preventDefault();
        fetch(`http://localhost:4000/comment/${this.props.commentUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({ username: this.state.username, date: this.state.date, entry: this.state.entry, rating: this.props.commentUpdate.rating }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then(() => {
                this.props.fetchComments();
                this.props.updateOff();

            })
    };

    closeUpdate = () => {
        this.props.updateOff();
    }

    handleOpen = () => {
        this.setState({
            handleopen: true,
        });
    }

    handleClose = () => {
        this.setState({
            handleopen: false,
        })
    }

    render() {
        return (
            <div className="editContainer">
                <Dialog open={true} onClose={this.closeUpdate}>
                    <DialogTitle id="dialogTitle">Update Submission<IconButton className="exit-btn-post-edit" onClick={this.closeUpdate}><ClearIcon /></IconButton></DialogTitle>
                    <DialogContent id="Edit" >
                        <TextField
                            margin="dense"
                            label="edit username"
                            type="text"
                            fullWidth
                            value={this.state.username}
                            onChange={(event) => this.setState({username: event.target.value})}
                        />
                        <TextField
                            margin="dense"
                            label="edit date"
                            type="text"
                            fullWidth
                            value={this.state.date}
                            onChange={(event) => this.setState({date: event.target.value})}
                        />
                        <TextField
                            margin="dense"
                            label="edit entry"
                            type="text"
                            fullWidth
                            value={this.state.entry}
                            onChange={(event) => this.setState({entry: event.target.value})}
                        />
                        <Box
                            component="fieldset"
                            mb={3}
                            borderColor="transparent"
                            id="ratingsBox"
                        >
                            <Rating
                                name="rating"
                                value={this.state.rating}
                                onChange={(e, newValue) =>
                                    this.setState({ rating: Number(newValue) })
                                }
                            />
                        </Box>
                            <Button type="submit" id="btn" onClick={this.handleUpdate}>Update Comment</Button>
                    </DialogContent>
                        <DialogActions id="Createbtn">
                        </DialogActions>
                </Dialog>
            </div>
        )
    }
}