import React from 'react';
import {
    Button,
    FormGroup,
    InputLabel,
    Box,
    TextField,
    Dialog,
    DialogContent,
    DialogActions,
    Typography,
    Grid,
} from '@material-ui/core';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import './Style.css';
import APIURL from '../helpers/environment';

interface Props {
    token: string,
    fetchSubs: () => void,
    SubmissionCreate: any,
    createOff: () => void,
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
        fetch(`${APIURL}/submission/create`, {
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
                <Grid container spacing={2} style={{padding: 2}}>
                    <Grid item xs={12} sm={6} lg={4} xl={12}>
                        <Button onClick={this.handleOpen} id="CreateBtn" variant="outlined">Submit a Creepy Story</Button>\
                    </Grid>
                </Grid>
                <Dialog open={this.state.handleopen} onClose={this.handleClose}>
                    <DialogContent id="submissions">
                        <Typography variant="h6" id="dialogTitle"><strong>Submission</strong></Typography>
                        <FormGroup>
                            <InputLabel htmlFor="Title" id="titleLabel">Title</InputLabel>
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
                                defaultValue="00/00/0000"
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
                        <input
                            accept="image/*"
                            className="inputImage"
                            id="contained-button-file"
                            type="file"
                            onChange={this.singleFileChangedHandler}
                        />
                    </DialogContent>
                    <DialogActions id="commentBtns">
                        <Box justifyContent="center">
                            <Button onClick={this.handleClose} className="createReviewButton">
                                <SkipPreviousIcon id="backIcon" />{" "}{" "}Back</Button>
                            <Button type="submit" className="createReviewButton" id="submitButton"onClick={this.handleSubmit} ><strong>Submit Story</strong></Button>
                        </Box>
                    </DialogActions>
                </Dialog>
            </div >
            
        )
    }
}






