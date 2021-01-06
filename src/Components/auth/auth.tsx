import React from 'react';
import Paper from '@material-ui/core/Paper';
import Login from './Login';
import Register from './Register';

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

    toggle = (event: any) => {
        event.preventDefault();
        if(this.state.Login === false) {
            return this.setState ({
                Login: true,
            })
        }
    }

    render() {
        const text = this.state.Login ? 'Want to Register?' : 'I have an account';
        return (
            <div className="container">
                <div>
                    <Paper className="root" elevation={12}>
                        <Login updateToken={this.props.updateToken} />
                        <Register updateToken={this.props.updateToken} />
                        <p onClick={this.toggle}>{text}</p>
                    </Paper>
                </div>
            </div>
        )
    }
};



