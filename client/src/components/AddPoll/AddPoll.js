import React, { Component } from "react";
import ReactDOM from 'react-dom';
import history from '../../history';

import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem , Button, ControlLabel, FormControl } from "react-bootstrap"; 

import PollListTable from '../Tables/PollListTable';


class AddPoll extends Component{

    constructor(props){
        super(props);

        this.serverdomain = 'http://localhost:3002/api';
        this.state = {
            polls : null,
            pollListTableData:null,
            pollname:''
        }

        this.goToQuestions = this.goToQuestions.bind(this);
    }

    componentDidMount(){
        if(!localStorage.getItem('user')){
            history.push('/');
        }
        else{
            var user = JSON.parse(localStorage.getItem('user'));
            console.log("User ID : "+user.userid);
            fetch(`${this.serverdomain}/getPolls`)

            fetch(`${this.serverdomain}/getPolls`, {
            method: 'POST',
            headers: new Headers({'Content-Type':'application/json'}),
            body: JSON.stringify({"userId":user.userid})
        }).then(res => res.json())
        .then(jsonData => {
            console.log(jsonData);
            var pollList = [];

            jsonData.map((poll) => {
                pollList.push({pollid:poll.pollid, name:poll.name});
            });
            this.setState({pollListTableData:pollList, polls:jsonData});
        })
        }
    }

    onChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }

    logout(){
        localStorage.clear();
        history.push('');
    }

    goToQuestions(){
        var user = JSON.parse(localStorage.getItem('user'));
        console.log(user)
        fetch(`http://localhost:3002/api/createPoll`, {
            method: 'POST',
            headers: new Headers({'Content-Type':'application/json'}),
            body: JSON.stringify({"userid":user.userid, "pollname":this.state.pollname})
        }).then(res => res.json())
        .then(poll => {
            console.log(poll);
            localStorage.setItem('pollid', poll.pollid);
            history.push('/addQuestions');
            //this.setToken(res.token) // Setting the token in localStorage
            //return Promise.resolve(res);
        })
    }

    render(){

        return (
            
            <div>
            <Navbar fluid collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                <Link to="/">Polling System</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                <NavItem onClick={this.logout}>Logout</NavItem>
                
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        
            <ControlLabel>Poll Name</ControlLabel>
            <FormControl type="text" value={this.state.pollname} id="pollname" onChange={this.onChange}/>
            <Button disabled={!this.state.pollname} onClick={this.goToQuestions}>Add a New Poll</Button>

            {
                this.state.pollListTableData?
                
                <PollListTable data={this.state.pollListTableData}></PollListTable>:<div>No Polls</div>
            }
            
        </div>);
    }
}

export default AddPoll