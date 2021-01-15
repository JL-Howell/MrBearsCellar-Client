import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import CommentIcon from '@material-ui/icons/Comment';
import Button from '@material-ui/core/Button';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import {
    Route,
    Link,
    Switch
} from 'react-router-dom';

import HomeIcon from '@material-ui/icons/Home';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import Home from './home';
import { render } from '@testing-library/react';
import SubmitIndex from '../../Submissions/SubmitIndex';
import CommentIndex from '../../Comments/CommentIndex';

const drawerWidth = 240;

const styles = theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.appBar + 1000,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
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
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
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

type Props = {
    token: string;
    clearToken: () => void;
    updateToken: (newToken: string) => void;
   
}

type State = {
    open: boolean,
    register: boolean;
    login: boolean;
    theme: any,
}

class SideDrawer extends React.Component<Props, State> {
    state = {
        open: false,
        register: false,
        login: false,
        theme: '',
        
    }

    handleDrawerOpen = () => {
        this.setState({ 
            open: true 
        });
    };

    handleDrawerClose = () => {
        this.setState({ 
            open: false 
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
      }
  
      HandleCloseReg = () => {
        this.setState({
          register: false,
        })
      }
  
      handleCloseLog = () => {
        this.setState({
          login: false,
        })
      }
    render() {

        const { open } = this.state;
        return(
        <div className ="sideDrawer" >
            <CssBaseline />
            <AppBar
                id="appBar"
                position="fixed"
            >
                <Toolbar id='toolbar'>
                    <Grid item xs={4} id="routerButton">
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            
                        >
                            <MenuIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={4} id='title'>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
            >
                <div className="drawerHeader">
                    <IconButton onClick={this.handleDrawerClose}>
                       
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <Link to="/" className="links" >
                        <ListItem button >
                            <ListItemIcon>
                                <HomeIcon className="sideIcons" />
                            </ListItemIcon>
                            <ListItemText>Home</ListItemText>
                        </ListItem>
                    </Link>
                    <Link to="/SubmitIndex" className="links" >
                        <ListItem button >
                            <ListItemIcon>
                                <CommentIcon className="sideIcons" />
                            </ListItemIcon>
                            <ListItemText>Submission Archives</ListItemText>
                        </ListItem>
                    </Link>
                    <Link to="/CommentIndex" className="links" >
                        <ListItem button >
                            <ListItemIcon>
                                <ForumOutlinedIcon className="sideIcons" />
                            </ListItemIcon>
                            <ListItemText>Comment Archives</ListItemText>
                        </ListItem>
                    </Link>
                </List>
                <Divider />
            </Drawer>
            <Switch>
                <Route exact path="/"><Home token={this.props.token} updateToken={this.props.updateToken} clearToken={this.props.clearToken}/></Route>
                <Route exact path="/Subission Archives" render={() => (<SubmitIndex token={this.props.token}/>)} />
                <Route exact path="/Comment" render={() => (<CommentIndex token={this.props.token}/>)} />
            </Switch>
        </div>
        )
    }
};

export default withStyles(styles)(SideDrawer);