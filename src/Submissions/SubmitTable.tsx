import React from 'react';
import { Card, CardContent } from '@material-ui/core';
//Material UI
import ClearIcon from '@material-ui/icons/Clear';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton/IconButton';


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


    postMapper = () => {
        let submissions = this.props.mySubs;
        console.log(submissions);

        return submissions.map((submission: any, index: number) => {
            return (
                <Card key={index}>
                    <CardContent><img src={submission.imageUrl} width="50%" height="50%" /></CardContent>
                    <CardContent>{submission.title}</CardContent>
                    <CardContent>{submission.date}</CardContent>
                    <CardContent>{submission.entry}</CardContent>
                    <CardContent>
                        <IconButton onClick={() => { this.props.editUpdateSubmits(submission); this.props.updateOn() }}><CreateIcon /></IconButton>
                        <IconButton className="delete-btn" onClick={() => { this.submissionDelete(submission)}} ><ClearIcon /></IconButton>
                    </CardContent>
                </Card>
            )
        })
    }

    render() {
        return (
            <Card>
                {this.postMapper()}
            </Card>
        )
    }
}


//     postMapper = () => {
//         let submissions = this.props.mySubmission;

//         return submissions.map((submission: any, index: number) => {
//             return (
//                 <Card key={index} className="post-card">
//                     <CardImg className="post-card-image" top width="100%" src={submission.imageUrl} alt="Card image cap" />
//                     <CardBody className="post-body">
//                         <CardSubtitle className="post-text">
//                             <p className="post-profile-username">{submission.title}</p><p>{submission.date}</p><p>{submission.entry}</p>
//                         </CardSubtitle>
//                         <br />
//                         <IconButton onClick={() => { this.props.editUpdateSubmits(submission); this.props.updateOn() }}><CreateIcon /></IconButton>
//                         <IconButton className="delete-btn" onClick={() => { this.submissionDelete(submission) }}><ClearIcon /></IconButton>
//                     </CardBody>
//                 </Card>
//             )
//         })
//     }

//     render() {
//         return (
//             <CardDeck className="post-card-deck">
//                 {this.postMapper()}
//             </CardDeck>
//         )
//     }
// }
//     render() {
//         return (
//             <>
//                 {this.props.token ?
//                     <TableContainer component={Paper}>
//                         <Table aria-label="simple table">
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell align="left"><strong>#</strong></TableCell>
//                                     <TableCell align="left"><strong>Title</strong></TableCell>
//                                     <TableCell align="left"><strong>Date</strong></TableCell>
//                                     <TableCell align="left"><strong>Entry</strong></TableCell>
//                                     <TableCell align="left"><strong>image</strong></TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {submissions.length > 0 && submissions.map((myreview, index) => {
//                                     return (
//                                         <TableRow key={index}>
//                                             <TableCell align="left">{myreview.title}</TableCell>
//                                             <TableCell align="left">{myreview.date}</TableCell>
//                                             <TableCell align="left">{myreview.entry}</TableCell>
//                                             <TableCell align="center">{myreview.rating}</TableCell>
//                                         </TableRow>
//                                     )
//                                 })}
//                             </TableBody>
//                         </Table>

//                     </TableContainer> : <Paper id="reviewMessage"><strong>Please Login or Sign Up to view this page</strong></Paper>}
//             </>
//         );
// }

