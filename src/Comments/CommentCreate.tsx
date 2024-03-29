import React from 'react';
import {
    Button,
    FormGroup,
    FormLabel,
    FormControl,
    InputLabel,
    Box,
    TextField,
    Dialog,
    DialogContent,
   DialogActions,
    Typography,
} from '@material-ui/core';
import './Comment.css';
import Rating from '@material-ui/lab/Rating';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';


interface Props {
    token: string,
    subId: number
    // key: number,
    // updateToken: (newToken: string) => void,
    // clearToken: () => void,
}

type State = {
    username: string;
    date: string;
    entry: string;
    rating: number;
    submissionId: number;
    handleopen: boolean;
}

export default class CommentCreate extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            username: "",
            date: "",
            entry: "",
            rating: 0,
            submissionId: 0,
            handleopen: false,
        }
    }

    handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        fetch(`http://localhost:4000/comment/create/${this.props.subId}`, {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                date: this.state.date,
                entry: this.state.entry,
                rating: this.state.rating,
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
        .then(res => res.json())
        .then((data) => {
            this.setState({
                username: '',
                date: '',
                entry: '',
                rating: 0,
            })
            this.handleClose();
        });
    };

    handleOpen = () => {
        this.setState({
            handleopen: true,
        });
        console.log('props:', this.props)
        console.log('state:', this.state)
    };

    handleClose = () => {
        this.setState({
            handleopen: false,
        });
    };

    setUsername(event: string) {
        this.setState({
            username: (event)
        })
    }

    setDate(event: string) {
        this.setState({
            date: (event)
        })
    }

    setEntry(event: string) {
        this.setState({
            entry: (event)
        })
    }

    setRating(event: number) {
        this.setState({
            rating: (event)
        })
    }

    render() {
        return (
            <div className="main">
                    <Button onClick={this.handleOpen} id="CreateBtn" variant="outlined" >Comment</Button>
                <Dialog open={this.state.handleopen} onClose={this.handleClose}>
                    <DialogContent id="comments">
                        <Typography variant="h6" id="dialogTitle"><strong>Comment</strong></Typography>
                        <FormGroup>
                            <InputLabel htmlFor="Username" id="titleLabel">Username</InputLabel>
                            <TextField
                                id="titleInput"
                                name="title"
                                value={this.state.username}
                                variant="outlined"
                                onChange={(e) => this.setUsername(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <InputLabel htmlFor="date" id="dateLabel">Date</InputLabel>
                            <TextField
                                id="dateInput"
                                type="date"
                                variant="outlined"
                                defaultValue="01/13/2021"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => this.setDate(e.target.value)}
                            >Date</TextField>
                        </FormGroup>
                        <FormGroup>
                            <InputLabel htmlFor="entry" id="entryLabel">Entry</InputLabel>
                            <TextField
                                name={this.state.entry}
                                multiline rowsMax={6}
                                variant="outlined"
                                id="entryInput"
                                onChange={(e) => this.setEntry(e.target.value)}
                            />
                        </FormGroup>
                        <FormControl component="fieldset" id="ratingLabel">
                            <FormLabel component="legend" id="ratingLabel"><strong>Rating</strong></FormLabel>
                            <Box component="fieldset" mb={3} borderColor="transparent" id="ratingsBox">
                                <Rating
                                    name="rating"
                                    value={this.state.rating}
                                    onChange={(e, newValue) =>
                                        this.setState({ rating: Number(newValue) })
                                    }
                                />
                            </Box>
                        </FormControl>
                    </DialogContent>
                    <DialogActions id="commentBtns">
                        <Box justifyContent="center">
                            <Button onClick={this.handleClose} className="createReviewButton">
                                <SkipPreviousIcon id="backIcon" />{" "}{" "}Back</Button>
                            <Button type="submit" className="createReviewButton" id="submitButton"onClick={this.handleSubmit} ><strong>Submit Comment</strong></Button>
                        </Box>
                    </DialogActions>
                </Dialog>
              
            </div >
        )
    }
}
