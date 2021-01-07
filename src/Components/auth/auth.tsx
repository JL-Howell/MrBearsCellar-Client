import React from 'react';
import Login from './Login';
import Register from './Register';
import Paper from '@material-ui/core/Paper';

type State = {
    Login: boolean;
}

type Props = {
    updateToken: (newToken: string) => void; 
}


export default class Auth extends React.Component<Props, State> {
    constructor(props: any) {
      super(props);
      this.state = {
        Login: true,
      };
    }

    toggle = () => {
        this.setState({
            Login: !this.state.Login
        })
    }

    render() {
        return (
            <div className="container">
                <div>
                    <Paper className="root" elevation={12}>
                        <Login updateToken={this.props.updateToken} />
                        <Register updateToken={this.props.updateToken} />
                        <p onClick={this.toggle}></p>
                    </Paper>
                </div>
            </div>
        )
    }
};



