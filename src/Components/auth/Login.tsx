import React from 'react';
import { 
    Button,
    TextField,
    Typography,
} from '@material-ui/core';

type Props = {
    updateToken: (newToken: string) => void,
}

type SigninState = {
    username: string,
    password: string,
    inCorrectPassword: boolean,
    noUsername: boolean,
}

export default class Login extends React.Component<Props, SigninState>{
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
            inCorrectPassword: false,
            noUsername: false,
        }
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        fetch('http://localhost:4000/user/login', {
            method: 'POST',
            body: JSON.stringify({ 
                username: this.state.username,
                password: this.state.password,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.error === 'incorrect password') {
                    alert('incorrect password!')
                    this.setState({
                        inCorrectPassword: true,
                    })
                }
                if (data.error === 'no username') {
                    alert('username does not exist...try again!')
                }
                this.props.updateToken(data.sessionToken);
            })
    }

    setUsername(event: string) {
        this.setState({
            username: (event)
        })
    }
  
    setPassword(event: string) {
        this.setState({
            password: (event)
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <Typography variant="h5" component="h5">
                        Login
                    </Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Username"
                        type="text"
                        fullWidth
                        onChange={(e) => this.setUsername(e.target.value)}
                        />
                        <TextField
                        autoFocus
                        margin="dense"
                        label="Password"
                        type="password"
                        fullWidth
                        onChange={(e) => this.setPassword(e.target.value)}
                        />
                        <Button type="submit" color="primary">
                            Login
                        </Button>
                </form>
            </div>
        )
    }
}
    


