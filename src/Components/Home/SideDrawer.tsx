import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, createStyles, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Login from '../auth/Login';
import Register from '../auth/Register';
import CommentIndex from '../../Comments/CommentIndex';
import SubmitIndex from '../../Submissions/SubmitIndex';
import Profile from '../Profile/myProfile';
import logo from '../../assets/mrbearscellar.png';
import {
	Route,
	Link,
	Switch
} from 'react-router-dom';

import CommentTwoToneIcon from '@material-ui/icons/CommentTwoTone';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import EventNoteTwoToneIcon from '@material-ui/icons/EventNoteTwoTone';
const drawerWidth = 240;

const styles = (theme: any) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		appBar: {
			transition: theme.transitions.create(['margin', 'width'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
		},
		appBarShift: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
			transition: theme.transitions.create(['margin', 'width'], {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		menuButton: {
			marginLeft: 12,
			marginRight: 20,
		},
		hide: {
			display: 'none',
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
		},
		drawerPaper: {
			width: drawerWidth,
		},
		drawerHeader: {
			display: 'flex',
			alignItems: 'center',
			padding: '0 8px',
			...theme.mixins.toolbar,
			justifyContent: 'flex-end',
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing.unit * 3,
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			marginLeft: -drawerWidth,
		},
		contentShift: {
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
		},
	});

interface Props {
	token: string;
	clickLogout: () => void;
	updateToken: (newToken: string) => void;
	classes: any,
	theme: any,
}

type State = {
	register: boolean;
	login: boolean;
	open: boolean,
}

class SideDrawer extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			register: false,
			login: false,
			open: false,
		}
	};

	handleDrawerOpen = () => {
		this.setState({
			open: true,
		});
	};

	handleDrawerClose = () => {
		this.setState({
			open: false,
		});
	};


	handleOpenReg = () => {
		this.setState({
			register: true,
		});
	};

	handleOpenLog = () => {
		this.setState({
			login: true,
		})
	};

	HandleCloseReg = () => {
		this.setState({
			register: false,
		})
	};

	handleCloseLog = () => {
		this.setState({
			login: false,
		})
	};


	render() {
		const { classes, theme } = this.props;
		const { open } = this.state;

		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					id="appBar"
					position="fixed"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open,
					})}
				>
					<Toolbar disableGutters={!open}>
						<Grid item xs={4} id="routerButton">
							<IconButton
								color="inherit"
								aria-label="Open drawer"
								onClick={this.handleDrawerOpen}
								className={clsx(classes.menuButton, open && classes.hide)}
							>
								<MenuIcon />
							</IconButton>
						</Grid>
						<Grid item xs={4} id="title">
							<Typography variant="h6" color="inherit" noWrap>
								<img src={logo} id="logo" alt="Logo" />
							</Typography>
						</Grid>
						{!this.props.token && (
							<Register updateToken={this.props.updateToken} />
						)}
						{this.props.token ? (
							<Button id="LogoutBtn" onClick={this.props.clickLogout}>LOGOUT</Button>
						) : (
								<Login updateToken={this.props.updateToken} />
							)}
					</Toolbar>
				</AppBar>
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={open}
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<div className={classes.drawerHeader}>
						<IconButton onClick={this.handleDrawerClose}>
							{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
						</IconButton>
					</div>
					<Divider />
					<List>
						<Link to="/Profile" className="links" >
							<ListItem button >
								<ListItemIcon>
									<AccountCircleTwoToneIcon className="sideIcons" />
								</ListItemIcon>
								<ListItemText>Profile</ListItemText>
							</ListItem>
						</Link>
						<Link to="/submissions" className="links" >
							<ListItem button >
								<ListItemIcon>
									<EventNoteTwoToneIcon className="sideIcons" />
								</ListItemIcon>
								<ListItemText>Submission Archives</ListItemText>
							</ListItem>
						</Link>
						<Link to="/comments" className="links" >
							<ListItem button >
								<ListItemIcon>
									<CommentTwoToneIcon className="sideIcons" />
								</ListItemIcon>
								<ListItemText>Comment Archive</ListItemText>
							</ListItem>
						</Link>
					</List>
					<Divider />
				</Drawer>
				<main
					className={clsx(classes.content, {
						[classes.contentShift]: open,
					})}
				>
				</main>
				<Switch>
					{/* <Route exact path="/Profile"><Profile /></Route> */}
					<Route exact path="/Submission Archive"><SubmitIndex token={this.props.token} /></Route>
					{/* <Route exact path="/Comment Archive"><CommentIndex token={this.props.token} /></Route> */}
				</Switch>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(SideDrawer);

