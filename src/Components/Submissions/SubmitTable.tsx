import React from 'react';
import { Card, CardContent, Grid } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import IconButton from '@material-ui/core/IconButton/IconButton';
import'./Style.css';
import APIURL from '../../helpers/environment';


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
        fetch(`${APIURL}/submission/delete/${submission.id}`, {
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
            <Grid container spacing={10} style={{padding: 24}}>
            {this.props.mySubs
            ? this.props.mySubs.map((mySubs) => (
                <Grid item xs={12} sm={6} lg={4} xl={4}>
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
                </Grid>
                ))
                : undefined} 

            </Grid>
            </div>
                
        )
    }
}
