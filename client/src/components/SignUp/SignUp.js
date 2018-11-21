import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./SignUp.css";
import history from '../../history';
import Layout from '../../Layout';


class SignUp extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name:"",
      email: "",
      password1: "",
      password2: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.name.length > 0;
  
}

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    if(this.state.password1!==this.state.password2)
        this.props.alert.show('Passwords Do Not Match')
    else
        {
            let data=  {
                name : this.state.name,
                email:this.state.email,
                password: this.state.password1
              };
              console.log(data)
              var request = new Request('https://votingapp-apachackathon.herokuapp.com:5777/api/createUser',{
                method:'POST',
                headers: new Headers({'Content-Type':'application/json'}),
                body: JSON.stringify(data)
              });
              fetch(request)
              .then(response => {
                    console.log("Reached Here");
                    history.push('/addPoll');
                    
              })
        }    

  }

  render() {
    return (
    
      <Layout>  
      <div className="SignUp">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="name" bsSize="large">
            <ControlLabel>Name</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.Name}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password1" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password1}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="password2" bsSize="large">
            <ControlLabel>Re-Enter Password</ControlLabel>
            <FormControl
              value={this.state.password2}
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
            Sign-Up
          </Button>
        </form>
      </div>
      </Layout>
    );
  }
}

export default SignUp;