import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton/IconButton';

type Props = {
    fetchSubs: () => void,
    updateOff: () => void,
    token: string,
    submissionUpdated: any,
}

type State = {
    title: string;
    date: string;
    entry: string;
    id: number,
    handleopen: boolean,
    
}

export default class SubmissionEdit extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            title: this.props.submissionUpdated.title,
            date: this.props.submissionUpdated.date,
            entry: this.props.submissionUpdated.entry,
            id: this.props.submissionUpdated.id,
            handleopen: false,
           
        }
    }

    editSubmission = () => {
        fetch(`http://localhost:4000/submission/update/${this.props.submissionUpdated.id}`, {
            method: 'PUT',
            body: JSON.stringify({title: this.state.title, date: this.state.date, entry: this.state.entry, id: this.state.id}),
            headers: new Headers({
                'Authorization': this.props.token
            })
        })
            .then(res => res.json())
            .then((updatedSubs) => {
                console.log(updatedSubs)
                this.props.fetchSubs();
                this.props.updateOff();
            })
    }

    componentDidMount () {
        console.log('SubmissionIndex', this.props.submissionUpdated)
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
            entry: event,
        });
    }

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
                            label="edit title"
                            type="text"
                            fullWidth
                            value={this.state.title}
                            onChange={(event) => this.editTitle(event.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="edit date"
                            type="text"
                            fullWidth
                            value={this.state.date}
                            onChange={(event) => this.editDate(event.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="edit entry"
                            type="text"
                            fullWidth
                            value={this.state.entry}
                            onChange={(event) => this.editEntry(event.target.value)}
                        />
                        <Button type="submit" id="btn" onClick={this.editSubmission}>Update Submission</Button>
                    </DialogContent>
                    <DialogActions id="Createbtn">
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}