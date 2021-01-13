
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import logo from '../../assets/mrbearscellar.png';
import './Home.css';

import Login from '../auth/Login';
import Register from '../auth/Register';

interface Props {
  token: string | null;
  clickLogout: () => void;
  updateToken: (newToken: string) => void;
}

type State = {
  register: boolean;
  login: boolean;
}

export default class TopBar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
          register: false,
          login: false,
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
        <div className="container">
            <img src={logo} id="logo" alt="Logo" />
          <AppBar id="appBar" position="fixed" >
            <Toolbar className="root">
				<ButtonGroup>
					{!this.props.token && (
						<Register 
							updateToken={this.props.updateToken}
						/>
					)}
					{this.props.token ? (
						<Button id="LogoutBtn" onClick={this.props.clickLogout}>
							LOGOUT
						</Button>
					) : (
						<Login 
						updateToken={this.props.updateToken} />
					)}
				</ButtonGroup>
            </Toolbar>
          </AppBar>
              <Typography id="CellarText" variant="h2" >Latest Cellar Stories</Typography>
        </div>
      );
    }
};