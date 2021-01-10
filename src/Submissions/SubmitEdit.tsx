import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    
} from '@material-ui/core';

type Props = {
    fetchPosts: () => void,
    updateOff: () => void,
    token: string,
    submitEdit: {
        id: number;
        title: string,
        date: string;
        entry: string;
        file: string;
        createdAt: string;
        updatedAt: string;
        userId: number;
    }
    handleOpen: boolean;
}

type State = {
    title: string;
    date: string;
    entry: string;
    file: string;
   
}

export default class SubmissionEdit extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            title: this.props.submitEdit.title,
            date: new Date(this.props.submitEdit.date).toLocaleDateString(),
            entry: this.props.submitEdit.entry,
            file: this.props.submitEdit.file,

        }
    }

    editSubmission = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const editSubData = new FormData()
        editSubData.append('image', this.state.file)
        editSubData.append('title', this.state.title)
        editSubData.append('date', this.state.date)
        editSubData.append('entry', this.state.entry)
        fetch('http://localhost:4000/submission/update/:id,', {
            method: 'PUT',
            body: editSubData,
            headers: new Headers({
                'Authorization': this.props.token
            })
        })
            .then(res => res.json())
            .then(() => {
                this.setState({
                    title: '',
                    date: '',
                    entry: '',
                })
                this.props.fetchPosts();
                this.props.updateOff();
            })
    }

    editFile(event: string) {
        this.setState({
            file: (event)
        });
    }

    editTitle(event: string) {
        this.setState({
            title: (event)
        });
    }

    editDate(event: string) {
        this.setState({
            date: (event)
        });
    }

    editEntry(event: string) {
        this.setState({
            entry: (event)
        });
    }

    singleFileChangeHandler = (event: any) => {
        this.setState({
            file: event.target.files[0]
        });
    }

    closeUpdate = () => {
        this.props.updateOff();
    }

    render() {
        return (
            <div className="editContainer">
                <Dialog open={this.props.handleOpen} onClose={this.closeUpdate}>
                    <DialogTitle id="dialogTitle">Update Submission</DialogTitle>
                    <DialogContent id="Edit">
                        <TextField
                            margin="dense"
                            label="Title"
                            type="text"
                            fullWidth
                            onChange={(e) => this.editTitle(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Date"
                            type="text"
                            fullWidth
                            onChange={(e) => this.editDate(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Entry"
                            type="text"
                            fullWidth
                            onChange={(e) => this.editEntry(e.target.value)}
                        />
                        <input
                            accept="image/*"
                            className="inputImage"
                            id="contained-button-file"
                            type="file"
                            onChange={this.singleFileChangeHandler}
                        />
                    </DialogContent>
                    <DialogActions id="Createbtn">
                        <Button onClick={this.editSubmission} id="btn">Submit</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}