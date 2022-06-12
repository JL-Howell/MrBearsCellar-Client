import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Components/Home/Dashboard';
import CommentIndex from '../src/Components/Comments/CommentIndex';
import SubmitIndex from '../src/Components/Submissions/SubmitIndex';
import AppBar from './Components/Home/AppBar';

type State = {
  token: string,
}

export default class App extends React.Component<{}, State>  {
  constructor(props: any){
    super(props)

    const token = localStorage.getItem('token')
    this.state = {
      token: token ? token : '',
    } 
  };
 
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

  render(){
    return (
      <div className="stars">
        <div className="twinkling">
          <div className="clouds">
            <Router>
                <AppBar clickLogout={this.clearToken.bind(this)} updateToken={this.updateToken.bind(this)} token={this.state.token} />
                <Dashboard clearToken={this.clearToken.bind(this)} updateToken={this.updateToken.bind(this)} token={this.state.token}/>
              {this.state.token ? (
                <Switch>
                  <Route exact path="/comments"><CommentIndex token={this.state.token} /></Route>
                  <Route exact path="/submissions"><SubmitIndex token={this.state.token} /></Route>
                </Switch>
              ) :  (null)}
            </Router>
          </div>
        </div>
      </div>
    );
  }
}