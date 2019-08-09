import React, { Component } from 'react';
import {NavLink, Route, Redirect, Switch} from 'react-router-dom';
import './App.css';
import {Login} from "./Login";
import {Register} from "./Register";
import {Employees} from "./Employees";
import {Suppliers} from "./Suppliers";
import {Test} from "./Test";
import logo from "./logob.png";
import report from './report';


class App extends Component {
  constructor(){
    super();
    this.state={
      isLoggedin:false
    }
  }

 componentDidMount(){
  localStorage.getItem("owner")&&this.setState({isLoggedin:true});
 }
  render() {
    return (
      <React.Fragment>
         <div style={{position: "fixed", backgroundColor:"#ffffff", width:"100%"}}>
        <div className="App-logo-div"><img src={logo} className="App-logo" alt="logo" /></div>
        <div className="App-logo-txt"><p> Welcome to Premier<div className="App-logo-txt2">The world of books...!!!</div></p></div>
        </div>
          <div style={{
            width:"100%",
            height:"100vh",
           }} className="App">
        
          {!this.state.isLoggedin?
          <Switch>
          <Redirect to="/login"/>
          </Switch>:
            <div style={{display:"flex", position:"fixed", width:"calc(100% - 40px)", justifyContent:"space-between", padding:"20px", color:"white", backgroundColor:"#c02906", marginTop:"155px"}}>
              <NavLink style={{color:"white", textDecoration:"none", cursor:"pointer", fontWeight:"bold"}} to="/employees">Employees</NavLink>
              <NavLink style={{color:"white", textDecoration:"none", cursor:"pointer", fontWeight:"bold"}} to="/suppliers">Suppliers</NavLink>
              <NavLink style={{color:"white", textDecoration:"none", cursor:"pointer", fontWeight:"bold"}} to="/report">Weekly Reports</NavLink>
              <div style={{color:"white", textDecoration:"none", cursor:"pointer", fontWeight:"bold"}} onClick={()=>{this.setState({isLoggedin:false}); localStorage.clear()}}>Logout</div>
            </div>
          }
          <Switch>
            <Route exact path="/login" render={()=><Login loggedIn={this.state.isLoggedin} loginSuccess={(d)=>{this.setState({isLoggedin:true, owner:d})}}/>}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/employees" render={()=><Employees owner={this.state.owner}/>}/>
            <Route exact path="/suppliers" render={()=><Suppliers owner={this.state.owner}/>}/>
            <Route exact path="/report" component={report}/>
          </Switch>
          </div>
      </React.Fragment>
    );
  }
}

export default App;
