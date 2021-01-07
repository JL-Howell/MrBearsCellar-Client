import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth from './Components/auth/auth';
import Main from './Components/Main/main';

export default class App extends React.Component {
    state = {
      sessionToken: ""
    } 
  
  componentDidlMount() {
    if(localStorage.getItem('token')){
      this.setState({
        sessionToken: localStorage.getItem('token')
      })
    }
  }
  
  updateToken(newToken: string){
    localStorage.setItem('token', newToken);
    this.setState({
      sessionToken: newToken
    });
  }

  clearToken(){
    localStorage.clear();
    this.setState({
      sessionToken: ""
    })
  }
    
  protectedViews = () => {
    return(
        this.state.sessionToken === localStorage.getItem('token') ? 
    <div>
        <Router>
          <Main clickLogout={this.clearToken.bind(this)} token={this.state.sessionToken}/>
        </Router>
    </div>
    : <Auth updateToken={this.updateToken.bind(this)} />
    );
  }

  render(){
    return (
      <div>
        {this.protectedViews()}
      </div>
    );
  }
}