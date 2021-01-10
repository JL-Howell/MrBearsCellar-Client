import React from "react";
// import { BrowserRouter as Router } from 'react-router-dom';
// import SubmitPost from './SubmitPost';
// import SubmitEdit from './SubmitEdit';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import IconButton from '@material-ui/core/IconButton';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
// import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid'
// import Box from '@material-ui/core/Box';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardMedia from '@material-ui/core/CardMedia';

// type Props = {
//     updateToken: (newToken: string) => void,
//     clearToken: () => void,
//     token: string,
// }

// type State = {
//     allSubs: Array<{
//         id: number;
//         title: string;
//         date: string;
//         entry: string;
//         imageUrl: string;
//         userId: number;
//     }>,
//     handleopen: boolean,
// }

// export default class SubmissionIndex extends React.Component<Props, State> {
//     constructor(props: Props) {
//         super(props);
//         this.state = {
//             allSubs: [],
//             handleopen: false,
//         }
//     }
    
//     fetchSubmissions = () => {
//         fetch('http://localhost:4000/submission/', {
//             method: 'GET',
//         })
//             .then(res => res.json())
//             .then(data => {
//                 this.setState({
//                     allSubs: data
//                 })
//                 console.log("response", data);
//             })
//     }

//     componentDidMount() {
//         this.fetchSubmissions();
//     }

//     handleOpen = () => {
//         this.setState({
//             handleopen: true,
//         });
//     };

//     handleClose = () => {
//         this.setState({
//             handleopen: false,
//         });
//     };

//     render() {
//         return (
//             <div>
//                 <Box component="span" display="block" p={1} m={1} bgcolor="background.paper">
//                     <Router>
//                         <SubmitPost token={this.props.token} />
                   
//                     </Router>
//                     {this.state.allSubs.map(allSubs => {
//                         return (
//                             <div key={allSubs.id}>
//                                 <Typography variant="h6" id="reviewTitle"><strong>{allSubs.title}</strong></Typography>
//                                 <Typography id="entryText">{allSubs.entry}</Typography>
//                                 <Typography id="entryDate">{allSubs.date}</Typography>
//                                 <img src={allSubs.imageUrl} width="50%" height="50%"/>
//                                 <hr />

//                             </div>
//                         )
//                     })};
//                 </Box>
//             </div>
            
//         )
//     }
// }