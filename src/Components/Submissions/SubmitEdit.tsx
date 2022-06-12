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
import APIURL from '../../helpers/environment';

type Props = {
    fetchSubs: () => void,
    updateOff: () => void,
    token: string,
    submissionUpdate: any,
}

type State = {
    title: string;
    date: string;
    entry: string;
    handleopen: boolean,
    
}

export default class SubmissionEdit extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            title: this.props.submissionUpdate.title,
            date: this.props.submissionUpdate.date,
            entry: this.props.submissionUpdate.entry,
            handleopen: false,
           
        }
    }

    handleUpdate = (event: React.SyntheticEvent) => {
        event.preventDefault();
        fetch(`${APIURL}/submission/update/${this.props.submissionUpdate.id}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            }),
            body: JSON.stringify({title: this.state.title, date: this.state.date, entry: this.state.entry})
        }) .then(() => {
            this.props.updateOff();
            this.props.fetchSubs();
            
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
                <Dialog open={true} >
                    <DialogTitle id="dialogTitle">Update Submission<IconButton className="exit-btn-post-edit" onClick={this.closeUpdate}><ClearIcon /></IconButton></DialogTitle>
                    <DialogContent id="Edit" >
                        <TextField
                            margin="dense"
                            label="edit title"
                            type="text"
                            fullWidth
                            value={this.state.title}
                            onChange={(event) => this.setState({title: event.target.value})}
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
                            onChange={(event) => {this.setState({entry: event.target.value})}}
                        />
                    </DialogContent>
                        <Button type="submit" id="btn" onClick={this.handleUpdate} >Submit</Button>
                </Dialog>
            </div>
        )
    }
}