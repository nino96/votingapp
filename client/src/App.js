// import React, { Component } from 'react';
// import history from './history';
// import {
//   Router,
//   Route,

// } from 'react-router-dom';
// import Login from './components/Login/Login';
// import Poll from './components/Poll/Poll';

// class App extends Component {
//   render() {
//     return (

//       <Router history={history}>
//         <div className="App">
//           {/* <Route exact path="/" component={Login}/> */}
//           <Route path="/poll/:pollid" component={Poll}/>
//         </div>
//       </Router>
//     );
//   }
// }

// export default App;
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap"; 
import "./App.css";
import Routes from "./Routes";

class App extends Component {
  render() {
    return (
      <div className="App container">
        {/* <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Polling System</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem href="/signup">Signup</NavItem>
              <NavItem href="/login">Login</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar> */}
        <Routes />
      </div>
    );
  }
}

export default App;
