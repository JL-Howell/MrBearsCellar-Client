import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Components/Home/Home';


export default class App extends React.Component {

    state = {
      sessionToken: ""
    } 
    
		componentDidMount() {
			if(localStorage.getItem('token') !== '') {
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
  
  render(){
    return (
      <div>
        <header className="app-header">
          <Router>
            <Home clearToken={this.clearToken.bind(this)} updateToken={this.updateToken.bind(this)} token={this.state.sessionToken} />
          </Router>
        </header>
    </div>
    );
  }
}