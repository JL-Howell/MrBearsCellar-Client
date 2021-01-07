import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {
  ButtonGroup, 
  Button,
  Typography,
} from '@material-ui/core';

type Props = {
  onClick: () => void;
  token: string;
}

export default class TopBar extends React.Component<Props> {
    render() {
    return (
        <div className="classes">
          <AppBar position="static">
            <Toolbar className="root">
              <Typography className="root" variant="h5" noWrap>
                Mr. Bear's Cellar
              </Typography>
              <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                <Button className="sign-up" onClick={this.props.onClick}>Sign Up</Button>
                <Button className="login" onClick={this.props.onClick}>Login</Button>
              </ButtonGroup>
            </Toolbar>
          </AppBar>
        </div>
      );
    }
};

