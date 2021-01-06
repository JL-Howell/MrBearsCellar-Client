import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {
  ButtonGroup, 
  Button,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',
  },
}));

type Props = {
  onClick: () => void;
  token: string
};

export default class TopBar extends React.Component<Props> {
    constructor(props: Props) {
      super(props);
    }

  render() {
    return (
        <div className="appbarRoot">
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
