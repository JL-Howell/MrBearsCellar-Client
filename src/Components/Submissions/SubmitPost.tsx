import React from 'react';

import {
    Button,
    Box,
    TextField,
    Dialog,
    DialogContent,
    DialogActions,
    Grid,
    DialogTitle,
} from '@material-ui/core';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import './Style.css';
import APIURL from '../../helpers/environment';

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
            .then((_subData) => {
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
            title: (event),
           
        })
    }

    setDate(event: any) {
        this.setState({
            date: (event),
           
        })
    }

    setEntry(event: string) {
        this.setState({
            entry: (event),
            
        })
    }

    singleFileChangedHandler = (event: any) => {
        this.setState({
            file: event.target.files[0],
           
        });
    }

    
    render() {
        return (
            <div>
                <Grid container justifyContent="center" style={{paddingBottom: 80}}>
                    {this.props.token ? (
                        <Button onClick={this.handleOpen} id="CreateBtn" variant="outlined" >Create Post</Button>
                    ) : undefined}
                </Grid>
                <Dialog open={this.state.handleopen} onClose={this.handleClose}>
                    <DialogContent id="submissions">
                        <DialogTitle id="dialogTitle"><strong>Create a post</strong></DialogTitle>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="titleInput"
                                        autoFocus
                                        margin="dense"
                                        placeholder="Title"
                                        label="Title"
                                        fullWidth
                                        value={this.state.title}
                                        variant="outlined"
                                        onChange={(e) => this.setTitle(e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        value={this.state.entry}
                                        multiline 
                                        minRows={8}
                                        label="Text"
                                        placeholder="Text (optional)"
                                        variant="outlined"
                                        id="entryInput"
                                        fullWidth
                                        onChange={(e) => this.setEntry(e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        id="date"
                                        label="Date"
                                        type="date"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}>
                                    </TextField>
                                </Grid>
                                <Grid item xs={3}>
                                    <input
                                        style={{marginTop: 28}}
                                        multiple
                                        className="input"
                                        accept="image/*"
                                        id="containerd-button-file"
                                        type="file"
                                        onChange={this.singleFileChangedHandler}
                                    />
                                </Grid>
                            </Grid>
                    </DialogContent>
                    <DialogActions id="commentBtns">
                        <Box justifyContent="center">
                            <Button onClick={this.handleClose} className="createReviewButton">
                                <SkipPreviousIcon id="backIcon" />{" "}{" "}Back</Button>
                            <Button type="submit" className="createReviewButton" id="submitButton"onClick={this.handleSubmit} ><strong>Post</strong></Button>
                        </Box>
                    </DialogActions>
                </Dialog>
            </div >
            
        )
    }
}






