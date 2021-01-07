import React from 'react';
import {Typography, Toolbar} from '@material-ui/core';

type Props = {
    subCreate: string,
    fetchPost: () => void,
    token: string,
    off: () => void,
}

type State = {
    submission: string,
    file: string,
}

export default class SubmissionCreate extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            submission: "",
            file: "",
        }
    }

    handleSubmit = (event: any) => {
        event.preventDefault(); 
        const subData = new FormData();
        subData.append('image', this.state.file)
        subData.append('submission', this.state.submission)
        if(this.state.submission) {
            fetch('http://localhost:4000/submission/create', {
                method: 'POST',
                body: subData,
                headers: new Headers({
                    'Authorization': this.props.token
                })
            })
            .then((res) => res.json())
            .then(() => {
                this.setState({
                    submission: ''
                })
                this.props.fetchPost();
                this.props.off();
            })
        }
    }

    imgChangeHandler = (event: any) => {
        this.setState({
            file: event.target.files[0]
        });
    }

    closeSubmission = () => {
        this.props.off();
    }

    render () {
        return (
            <div>
                <Toolbar>
                    <Typography className="root" variant="h5" noWrap>
                        Submissions
                    </Typography>
                </Toolbar>
            </div>
        )
    }
}