import React from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core';
import './Style.css';

interface Props {
    token: string,
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
            .then(data => {
                this.setState({
                    title: '',
                    date: '',
                    entry: '',
                })
                console.log(data)
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
            <div className="container">
                <Button onClick={this.handleOpen} id="CreateButton" variant="outlined">Create a Creepy Submission</Button>
                <Dialog open={this.state.handleopen} onClose={this.handleClose}>
                    <DialogTitle id="CreatePopup">
                        Create Post
                </DialogTitle>
                    <DialogContent id="Create">
                        <TextField
                            margin="dense"
                            label="Title"
                            type="text"
                            fullWidth
                            onChange={(e) => this.setTitle(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Date"
                            type="text"
                            fullWidth
                            onChange={(e) => this.setDate(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Entry"
                            type="text"
                            fullWidth
                            onChange={(e) => this.setEntry(e.target.value)}
                        />
                        <input
                            accept="image/*"
                            className="inputImage"
                            id="contained-button-file"
                            type="file"
                            onChange={this.singleFileChangedHandler}
                        />
                    </DialogContent>
                    <DialogActions id="Createbtn">
                        <Button onClick={this.handleSubmit} id="btn">Submit</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}