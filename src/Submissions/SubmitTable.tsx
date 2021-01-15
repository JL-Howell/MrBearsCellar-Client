import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import IconButton from '@material-ui/core/IconButton/IconButton';
import'./Style.css';



type Props = {
    mySubs: Array<{
        id: number;
        title: string;
        date: string;
        entry: string;
        imageUrl: string;
    }>,
    editUpdateSubmits: (submission: any) => void,
    updateOn: () => void,
    fetchSubs: () => void,
    token: string

}

export default class submissionTable extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    submissionDelete = (submission: any) => {
        fetch(`http://localhost:4000/submission/delete/${submission.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(() => this.props.fetchSubs())
    }


    render () {
        return (
            <div>
            {this.props.mySubs
            ? this.props.mySubs.map((mySubs) => (
                <Card key={mySubs.id} id="CardTable">
                    <CardContent><img src={mySubs.imageUrl} width="50%" height="50%" /></CardContent>
                    <CardContent>{mySubs.title}</CardContent>
                    <CardContent>{mySubs.date}</CardContent>
                    <CardContent>{mySubs.entry}</CardContent>
                    <CardContent>
                        <IconButton id="editBtn" onClick={() => { this.props.editUpdateSubmits(mySubs); this.props.updateOn() }}><BorderColorOutlinedIcon /></IconButton>
                        <IconButton id="deleteBtn" onClick={() => { this.submissionDelete(mySubs)}} ><DeleteOutlineIcon /></IconButton>
                        <hr />
                    </CardContent>
                </Card>
            ))
            : undefined} 
            </div>
                
        )
    }
}
