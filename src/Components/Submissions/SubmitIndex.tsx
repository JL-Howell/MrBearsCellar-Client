import React from 'react';
import SubmitPost from './SubmitPost';
import SubmitEdit from './SubmitEdit';
import SubmitTable from './SubmitTable';
import Grid from '@material-ui/core/Grid';
import './Style.css';
import APIURL from '../../helpers/environment';
type Props = {
    token: string;
}

type State = {
    mySubs: any,
    submissionUpdate: any,
    SubmissionCreate: any,
    updateActive: boolean,
    submissionCreateActive: boolean,
}

export default class SubmitIndex extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            mySubs: [],
            submissionUpdate: {},
            SubmissionCreate: {},
            updateActive: false,
            submissionCreateActive: false,
        }
    }

    fetchSubs = () => {
        fetch(`${APIURL}/submission/mine`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem("token")}`

            })
        })
            .then((res) => res.json())
            .then((subData) => {
                this.setState({
                    mySubs: subData
                })
                console.log("Submissions", this.state.mySubs)
            })
    }

    componentDidMount() {
        this.fetchSubs()
    }

    editUpdateSubmits = (submission: any) => {
        this.setState({
            submissionUpdate: submission
        })
    }

    editCreateSubmits = (submission: any) => {
        this.setState({
            submissionUpdate: submission
        })
    }

    updateOn = () => {
        this.setState({
            updateActive: true
        })
    }

    updateOff = () => {
        this.setState({
            updateActive: false
        })
    }

    createOff = () => {
        this.setState({
            submissionCreateActive: false
        })
    }

    createOn = () => {
        this.setState({
            submissionCreateActive: true
        })
    }

    render() {
        return (
            <div className="Container">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                            <SubmitPost
                                fetchSubs={this.fetchSubs.bind(this)}
                                SubmissionCreate={this.state.SubmissionCreate}
                                token={this.props.token}
                                createOff={this.createOff.bind(this)}
                            /> 
                            <SubmitTable
                                mySubs={this.state.mySubs}
                                editUpdateSubmits={this.editUpdateSubmits.bind(this)}
                                updateOn={this.updateOn.bind(this)}
                                fetchSubs={this.fetchSubs.bind(this)}
                                token={this.props.token}
                        />
                        {this.state.updateActive ?
                            <SubmitEdit
                                submissionUpdate={this.state.submissionUpdate}
                                updateOff={this.updateOff.bind(this)}
                                token={this.props.token}
                                fetchSubs={this.fetchSubs.bind(this)}
                            />
                            : <></>}
                    </Grid>
                </Grid>
            </div>
        )
    }
}