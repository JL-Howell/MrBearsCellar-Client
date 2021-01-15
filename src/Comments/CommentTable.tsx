import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton/IconButton';


type Props = {
    myComments: Array<{
        id: number;
        username: string;
        date: string;
        entry: string;
        rating: number;
        userId: number;
    }>,
    editUpdateComments: (submission: any) => void,
    updateOn: () => void,
    fetchComments: () => void,
    token: string
}

export default class submissionTable extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    commentDelete = (comment: any) => {
        fetch(`http://localhost:4000/comment/${comment.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(() => this.props.fetchComments())
    };

        render () {
            return (
                <div>
                {this.props.myComments
                ? this.props.myComments.map((myComments) => (
                    <Card key={myComments.id}>
                        <CardContent>{myComments.username}</CardContent>
                        <CardContent>{myComments.date}</CardContent>
                        <CardContent>{myComments.entry}</CardContent>
                        <CardContent>{myComments.rating}</CardContent>
                        <CardContent>
                            <IconButton onClick={() => { this.props.editUpdateComments(myComments); this.props.updateOn() }}><CreateIcon /></IconButton>
                            <IconButton className="delete-btn" onClick={() => { this.commentDelete(myComments)}} ><ClearIcon /></IconButton>
                        </CardContent>
                    </Card>
                ))
                : undefined} 
                </div>  
            )
        }
}
