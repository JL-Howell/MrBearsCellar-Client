export default {}


// import React from 'react';
// import {createStyles, withStyles, Theme} from "@material-ui/core/styles";
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
// import logo from '../../assets/mrbearscellar.png';
// import './Home.css';

// import Login from '../auth/Login';
// import Register from '../auth/Register';
// import SideDrawer from './SideDrawer';

// const styles = (theme: Theme) =>
//   createStyles({
//     root: {
//       flexGrow: 1,
//     },
//     menuButton: {
//       marginRight: theme.spacing(2),
//     },
//   });

// interface Props {
// 	token: string | null;
// 	clickLogout: () => void;
// 	updateToken: (newToken: string) => void;
//   }
  
//   type State = {
// 	register: boolean;
// 	login: boolean;
// 	handleopen: boolean,
//   }
  
//   class TopBar extends React.Component<Props, State> {
// 	  constructor(props: Props) {
// 		  super(props);
// 		  this.state = {
// 			register: false,
// 			login: false,
// 			handleopen: false,
// 		  }
// 	  }

//     handleOpenReg = () => {
//       this.setState({
//         register: true,
//       });
//     };

//     handleOpenLog = () => {
//       this.setState({
//         login: true,
//       })
//     }

//     HandleCloseReg = () => {
//       this.setState({
//         register: false,
//       })
//     }

//     handleCloseLog = () => {
//       this.setState({
//         login: false,
//       })
//     }

//     render() {
//     return (
//         <div className="container">
//             <img src={logo} id="logo" alt="Logo" />
//           <AppBar id="appBar" position="static" >
//             <Toolbar>
// 				<Grid item xs={6} id="drawerButton">
//             	</Grid>
// 				<Grid item xs={6} id="title">
// 					{!this.props.token && (
// 						<Register updateToken={this.props.updateToken} />
// 					)}
// 					{this.props.token ? (
// 						<Button id="LogoutBtn" onClick={this.props.clickLogout}>LOGOUT</Button>
// 						) : (
// 						<Login updateToken={this.props.updateToken} />
// 					)}
// 				</Grid>
//             </Toolbar>
//           </AppBar>
//             {/* <Login updateToken={this.props.updateToken}/>
//             <Register updateToken={this.props.updateToken}/> */}
//               <Typography id="CellarText" variant="h2" >Latest Cellar Stories</Typography>
//         </div>
//       );
//     }
// };

// export default withStyles(styles)(TopBar);