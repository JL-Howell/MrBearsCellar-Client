import React from 'react';
import TextField from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core';


type Props = {
    updateToken: (newToken: string) => void,
}

type Register = {
    username: string;
    email: string;
    password: string;
    role: boolean;
}

class SignUp extends React.Component<Props, Register> {
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
                    role: this.state.role
               }),
               headers: new Headers({
                    "Content-Type": "application/json"
               })
           })
           .then(res => res.json())
           .then(data => {
               this.props.updateToken(data.sessionToken)
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

   setRole(event: boolean) {
       this.setState({
           role: event
       })
   }

   render() {
    const { classes } = this.props;
    return (
        <div className={classes.container}>
            <h1>Register</h1>
            <p>All fields required</p>
            <TextField
                onChange={this.handleChange}
                name="email"
                id="email"
                label="Email"
                style={{ margin: 8 }}
                placeholder="memelicious@sassycats.io"
                required
                type="email"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                onChange={this.handleChange}
                name="username"
                id="username"
                label="Username"
                style={{ margin: 8 }}
                placeholder="cssIsAwesome42"
                type="text"
                fullWidth
                required
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                onChange={this.handleChange}
                name="password"
                id="password"
                label="Password"
                style={{ margin: 8 }}
                placeholder="LetMeIn!!"
                fullWidth
                required
                type="password"
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            {/* <button onClick={this.handleSubmit}>Sign In</button> */}
            <Button onClick={this.handleSubmit} variant="outlined" className={classes.button}>
                Sign Up
            </Button>
        </div>
        )
    }
}

export default withStyles(styles)(SignUp);