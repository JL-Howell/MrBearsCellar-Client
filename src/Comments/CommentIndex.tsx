import React from 'react';
import CommentCreate from './CommentCreate';
import CommentEdit from './CommentEdit';
import CommentTable from './CommentTable';
import Grid from '@material-ui/core/Grid';
import APIURL from '../helpers/environment';

type Props = {
    token: string;
    // updateToken: (newToken: string) => void,
    // clearToken: () => void,
}

type State = {
    myComments: any,
    commentUpdate: any,
    updateActive: boolean,

}

export default class SubmitIndex extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            myComments: [],
            commentUpdate: {},
            updateActive: false,
        }
          
    }

    fetchComments = () => {
        console.log(this.props.token);
        fetch(`${APIURL}/comment/mine`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem("token")}`
            })
        })
            .then((res) => res.json())
            .then((subData) => {
                this.setState({
                    myComments: subData.comments
                })
                console.log("Comments", this.state.myComments)
            })
    }

    componentDidMount() {
        this.fetchComments()
    }

    editUpdateComments = (comments: any) => {
        this.setState({
            commentUpdate: comments
        })
    }

    editCreateComments = (comments: any) => {
        this.setState({
            commentUpdate: comments
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

    render() {
        return (
            <div className="Container">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                            {/* <CommentCreate
                                fetchComments={this.fetchComments.bind(this)}
                                token={this.props.token}
                                // updateToken={this.props.updateToken}
                                // clearToken={this.props.clearToken}
                            
                            /> : <> </> */}
                            <CommentTable
                                myComments={this.state.myComments}
                                editUpdateComments={this.editUpdateComments.bind(this)}
                                updateOn={this.updateOn.bind(this)}
                                fetchComments={this.fetchComments.bind(this)}
                                token={this.props.token}
                        />
                        {this.state.updateActive ?
                            <CommentEdit
                                commentUpdate={this.state.commentUpdate}
                                updateOff={this.updateOff.bind(this)}
                                token={this.props.token}
                                fetchComments={this.fetchComments.bind(this)}
                            />
                            : <></>}
                    </Grid>
                </Grid>
            </div>


        )
    }
}