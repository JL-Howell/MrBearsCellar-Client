import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
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
    file: string;
    handleopen: boolean,
    
}

export default class SubmissionEdit extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            title: this.props.submissionUpdate.title,
            date: this.props.submissionUpdate.date,
            entry: this.props.submissionUpdate.entry,
            file: this.props.submissionUpdate.file,
            handleopen: false,
           
        }
    }

    handleUpdate = (event: React.SyntheticEvent) => {
        event.preventDefault();
        fetch(`${APIURL}/submission/update/${this.props.submissionUpdate.id}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.token}`
            }),
            body: JSON.stringify({title: this.state.title, date: this.state.date, entry: this.state.entry, file: this.state.file})
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
    
    singleFileChangedHandler = (event: any) => {
        this.setState({
            file: event.target.files[0],
           
        });
    }

    render() {
        return (    
            <div className="editContainer">
                <Dialog open={true} >
                    <DialogContent id="Edit" >
                    <DialogTitle id="dialogTitle">Edit Post<IconButton className="exit-btn-post-edit" onClick={this.closeUpdate}><ClearIcon /></IconButton></DialogTitle>
                        <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                placeholder="Title"
                                label="Title"
                                autoFocus
                                variant='outlined'
                                fullWidth
                                value={this.state.title}
                                onChange={(event) => this.setState({title: event.target.value})}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                />
                        </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    multiline 
                                    minRows={8}
                                    label="Text"
                                    placeholder="Text (optional)"
                                    variant="outlined"
                                    id="entryInput"
                                    fullWidth
                                    value={this.state.entry}
                                    onChange={(event) => {this.setState({entry: event.target.value})}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                        <Grid item xs={4}>
                                <TextField
                                    value={this.state.date}
                                    id="date"
                                    label="Date"
                                    type="date"
                                    fullWidth
                                    onChange={(event) => this.setState({date: event.target.value})}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
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
                        </Grid>
                    </DialogContent>
                        <Button type="submit" id="btn" onClick={this.handleUpdate}>Update</Button>
                </Dialog>
            </div>
        )
    }
}