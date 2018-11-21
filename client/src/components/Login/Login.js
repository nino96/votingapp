import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import history from '../../history';
import Layout from '../../Layout';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    if(this.validateForm()){
        fetch(`http://localhost:5777/api/login`, {
            method: 'POST',
            headers: new Headers({'Content-Type':'application/json'}),
            body: JSON.stringify({"email":this.state.email, "password":this.state.password})
        }).then(res => res.json())
        .then(jsonData => {
            console.log(jsonData);
            localStorage.setItem('user', JSON.stringify(jsonData));
            history.push('/addPoll');
            //this.setToken(res.token) // Setting the token in localStorage
            //return Promise.resolve(res);
        })
    }

    // fetch("http://localhost:5777/api/login")
    // .then(response => response.json())
    // .then(jsondata => {
    //     console.log(jsondata)
    //     for(var i=0;i<jsondata.length;i++)
    //         if(this.state.email===jsondata[i].email&&this.state.password===jsondata[i].password)
    //             localStorage.setItem()``
    //             history.push('/addPoll');
    // })
  }

  render() {
    return (

        <Layout>
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
      </Layout>
    );
  }
}

export default Login;