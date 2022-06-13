import React from 'react';

import {
  Tooltip,
  Toolbar,
  AppBar,
  ButtonGroup,
  Grid,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  IconButton
} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NoteIcon from '@material-ui/icons/Note';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import { Link} from 'react-router-dom'
import logo from '../../Assets/mrbearscellar.png'
import './Home.css';

import Login from '../Authn/Login';
import Register from '../Authn/Register';

interface Props {
  token: string | null;
  clickLogout: () => void;
  updateToken: (newToken: string) => void;
}

type State = {
  register: boolean;
  login: boolean;
  left: boolean;
}

class NavBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      register: false,
      login: false,
      left: false,
    }
  }

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
      return (
        <div>
            <Grid container spacing={10} style={{padding: 24}}>
              <Grid item xs={12} sm={6} lg={4} xl={12}>
            <AppBar id="appBar" position="fixed" >
              <Toolbar className="root" >
              <img src={logo} id="logo" alt="Logo" />
              
          <ButtonGroup>
            {!this.props.token && (
              <Register 
              updateToken={this.props.updateToken}
              />
            )}
            {this.props.token ? (
              <>
              <List>
                  <ListItem button id="myLibrary">
                  <Link to="/submissions" className="links">
                    <Tooltip title="Library" arrow>
                      <ListItemIcon className="drawerIcons">
                          <LocalLibraryIcon id="ishIcons"/>
                      </ListItemIcon>
                    </Tooltip>
                  </Link>
                  </ListItem>
              </List>
              <Divider />
              <Divider />
              <List>
                  <ListItem button id="myComments">
                  <Link to="/comments" className="links">
                    <Tooltip title="Comments" arrow>
                      <ListItemIcon className="drawerIcons">
                          <NoteIcon id="ishIcons" />
                      </ListItemIcon>
                      </Tooltip>
                  </Link>
                  </ListItem>
              </List>
              <Divider />
                <Tooltip title="Logout" arrow>
                  <IconButton id="ishBtn" aria-label="logout"> 
                  <ExitToAppIcon  id="ishIcons" onClick={this.props.clickLogout} />
                  </IconButton>
                </Tooltip>
                
              </>
            ) : (
              <Login 
              updateToken={this.props.updateToken} />
            )}
          </ButtonGroup>
              </Toolbar>
            </AppBar>
              </Grid>
            </Grid>
      </div>
        );
      }
};

export default (NavBar);