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
    DialogTitle,
    DialogContent,
   DialogActions,
    Typography,
} from '@material-ui/core';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import './Style.css';

interface Props {
    token: string,
    fetchSubs: () => void,
}

type State = {
    title: string;
    date: string;
    entry: string;
    file: string;
    handleopen: boolean;
}

export default class SubmissionCreate extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            title: "",
            date: "",
            entry: "",
            file: "",
            handleopen: false,
        }
    }

    handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const subData = new FormData();
        subData.append('image', this.state.file)
        subData.append('title', this.state.title)
        subData.append('date', this.state.date)
        subData.append('entry', this.state.entry)
        fetch('http://localhost:4000/submission/create', {
            method: 'POST',
            body: subData, 
            headers: new Headers({
                // 'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then(res => res.json())
            .then((subData) => {
                this.setState({
                    title: '',
                    date: '',
                    entry: '',
                })
                this.props.fetchSubs();
                this.handleClose();
            })
    };

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

    setTitle(event: string) {
        this.setState({
            title: (event)
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

    singleFileChangedHandler = (event: any) => {
        this.setState({
            file: event.target.files[0]
        });
    }

    render() {
        return (
            <div className="main">
                    <Button onClick={this.handleOpen} id="CreateBtn" variant="outlined" >Create A Creepy Submissison</Button>
                <Dialog open={this.state.handleopen} onClose={this.handleClose}>
                    <DialogTitle id="dialogTitle">
                        Submission
                    </DialogTitle>
                    <DialogContent id="Submission">
                        <Typography variant="h6" id="dialogTitle"><strong>Submit if you Dare!</strong></Typography>
                        <FormGroup>
                            <InputLabel htmlFor="Username" id="titleLabel">Username</InputLabel>
                            <TextField
                                id="titleInput"
                                name="title"
                                value={this.state.title}
                                variant="outlined"
                                onChange={(e) => this.setTitle(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <InputLabel htmlFor="date" id="dateLabel">Date</InputLabel>
                            <TextField
                                id="dateInput"
                                type="date"
                                variant="outlined"
                                defaultValue="1982-05-10"
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
                            <FormLabel component="legend" id="ratingLabel"><strong>Image</strong></FormLabel>
                            <Box component="fieldset" mb={3} borderColor="transparent" id="ratingsBox">
                            <input
                            accept="image/*"
                            className="inputImage"
                            id="contained-button-file"
                            type="file"
                            onChange={this.singleFileChangedHandler}
                        />
                            </Box>
                        </FormControl>
                    </DialogContent>
                    <DialogActions id="commentBtns">
                        <Box justifyContent="center">
                            <Button onClick={this.handleSubmit} className="createReviewButton">
                                <SkipPreviousIcon id="backIcon" />{" "}{" "}Back</Button>
                            <Button type="submit" className="createReviewButton" id="submitButton"><strong>Submit Comment</strong></Button>
                        </Box>
                    </DialogActions>
                </Dialog>
              
            </div >
            // <div className="container">
            //     <Button onClick={this.handleOpen} id="CreateButton" variant="outlined" >Create a Creepy Submission</Button>
            //     <Dialog
            //         fullWidth
            //         open={this.state.handleopen}
            //         onClose={this.handleClose}
            //         aria-labelledby="scroll-dialog-title"
            //         aria-describedby="scroll-dialog-description"
            //     >
            //             <DialogTitle id="scroll-dialog-title">Create Submission</DialogTitle>
            //         <DialogContent id="Create">
            //             <TextField
            //                 margin="dense"
            //                 label="Title"
            //                 type="text"
            //                 fullWidth
            //                 onChange={(e) => this.setTitle(e.target.value)}
            //             />
            //             <TextField
            //                 margin="dense"
            //                 label="Date"
            //                 type="text"
            //                 fullWidth
            //                 onChange={(e) => this.setDate(e.target.value)}
            //             />
            //             <TextField
            //                 margin="dense"
            //                 label="Entry"
            //                 type="text"
            //                 fullWidth
            //                 onChange={(e) => this.setEntry(e.target.value)}
            //             />
            //             <input
            //                 accept="image/*"
            //                 className="inputImage"
            //                 id="contained-button-file"
            //                 type="file"
            //                 onChange={this.singleFileChangedHandler}
            //             />
            //         </DialogContent>
            //         <DialogActions id="Createbtn">
            //             <Button onClick={this.handleSubmit} id="btn">Submit</Button>
            //         </DialogActions>
            //     </Dialog>
            // </div>
        )
    }
}