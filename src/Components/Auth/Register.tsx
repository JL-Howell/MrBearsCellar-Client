import React from 'react';
import { 
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core';
import './auth.css';
import APIURL from '../../helpers/environment';

type Props = {
    updateToken: (newToken: string) => void,
}

type RegisterState = {
    username: string;
    email: string;
    password: string;
    role: boolean;
    handleopen: boolean;
    
}

class SignUp extends React.Component<Props, RegisterState> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            role: false,
            handleopen: false,
        }
    }

   handleSubmit = (event: any) => {
       event.preventDefault();
       if (this.state.password.length < 8) {
           alert('password must be at least 8 characters')
       } else {
        fetch(`${APIURL}/user/signup`, {
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
               console.log(data.token);
               this.props.updateToken(data.token);
               this.handleClose();
           })
       }
   }

   handleOpen = () => {
    this.setState({
      handleopen: true,
    });
  };

  handleClose = () => {
    this.setState({
      handleopen: false,
    });
  };

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
        <div className="container">
            <Button onClick={this.handleOpen} id="RegisterButton" variant="outlined">Sign Up</Button>
            <Dialog open={this.state.handleopen} onClose={this.handleClose}>
            <DialogTitle id="RegisterPopup">
                Sign Up
            </DialogTitle>
            <DialogContent id="Register">
                <TextField
                    margin="dense"
                    label="Username"
                    type="text"
                    fullWidth
                    onChange={(e) => this.setUsername(e.target.value)}
                    />
                    <TextField
                    margin="dense"
                    label="Email"
                    type="text"
                    fullWidth
                    onChange={(e) => this.setEmail(e.target.value)}
                    />
                    <TextField
                    margin="dense"
                    label="Password"
                    type="password"
                    fullWidth
                    onChange={(e) => this.setPassword(e.target.value)}
                    />
            </DialogContent>
            <DialogActions id="Registerbtn">
                <Button onClick={this.handleSubmit} id="btn">Register</Button>
            </DialogActions>
            </Dialog>
        </div>
      )
   }
}

export default SignUp;