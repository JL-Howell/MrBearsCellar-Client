import React from 'react';
import { 
    Button,
    TextField,
    Typography,
} from '@material-ui/core';

type Props = {
    updateToken: (newToken: string) => void,
}

type RegisterState = {
    username: string;
    email: string;
    password: string;
    role: boolean;
}

class SignUp extends React.Component<Props, RegisterState> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            role: false,
        }
    }

   handleSubmit = (event: any) => {
       event.preventDefault();
       if (this.state.password.length < 8) {
           alert('password must be at least 8 characters')
       } else {
           fetch('http://localhost:4000/user/signup', {
               method: "POST", 
               body: JSON.stringify({
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
               }),
               headers: new Headers({
                    "Content-Type": "application/json"
               })
           })
           .then(res => res.json())
           .then(data => {
               console.log(data);
           })
       }
   }

   setUsername(event: string) {
       this.setState({
           username: (event)
       })
   }

   setEmail(event: string) {
       this.setState({
           email: (event)
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
                    Sign Up
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
                    label="Email"
                    type="text"
                    fullWidth
                    onChange={(e) => this.setEmail(e.target.value)}
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
                        Sign Up
                    </Button>
            </form>
        </div>
      )
   }
}

export default SignUp;