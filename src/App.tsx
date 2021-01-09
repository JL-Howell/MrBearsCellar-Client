import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Components/Home/home';

export default class App extends React.Component {
    state = {
      token: ""
    } 
    
  componentDidlMount() {
    if(localStorage.getItem('token')){
      this.setState({
        token: localStorage.getItem('token')
      })
    }
  }
  
  updateToken(newToken: string){
    localStorage.setItem('token', newToken);
    this.setState({
      token: newToken
    });
  }

  clearToken(){
    localStorage.clear();
    this.setState({
      token: ""
    })
  }
  
  render(){
    return (
      <div>
        <header className="app-header">
          <Router>
            <Home clearToken={this.clearToken.bind(this)} updateToken={this.updateToken.bind(this)} token={this.state.token}/>
          </Router>
        </header>
    </div>
    );
  }
}