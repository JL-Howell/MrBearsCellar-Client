import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Components/Home/home';

type State = {
  token: string,
}

export default class App extends React.Component<{}, State>  {
  constructor(props: any){
    super(props)

    // this.updateToken = this.updateToken.bind(this);
    // this.clearToken = this.clearToken.bind(this);
    let token = localStorage.getItem('token')
    this.state = {
      token: token ? token : '',
    } 
  };
  // setToken(){
  //   let sessionToken = localStorage.getItem('token')
  //     console.log("Token: ", sessionToken)
  //    this.setState({token: sessionToken})
  //   console.log(this.state)
  // }

    
  
  updateToken(newToken: string){
    localStorage.setItem('token', newToken);
    console.log(newToken)
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
  // componentWillMount(){
  //   this.setToken()
  // }
  
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