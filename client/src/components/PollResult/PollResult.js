import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Form, Label, Badge, Panel, Radio, ListGroup, ListGroupItem, Button, Row,Col,Navbar, Nav, NavItem, MenuItem, NavDropdown, DropdownButton, Glyphicon,Tabs,Tab} from 'react-bootstrap';
import axios from 'axios';
import history from '../../history';

import Pusher from 'pusher-js';

class PollResult extends React.Component{
    constructor(props){
        super(props);
        this.serverdomain = 'http://localhost:5777';
        this.socketId = null;
        this.state = {
            pollid:'',
            poll:null,
            loading: true,
            socketId:null
        }
        //this.handleChange = this.handleChange.bind(this);
    }

    // componentWillReceiveProps(){
    //     console.log("Poll ID : "+this.props.match.params.pollid);
    //     this.setState({pollid:this.props.match.params.pollid});
    // }

    componentDidMount(){
        console.log(localStorage.getItem('user'));
        if(!localStorage.getItem('user')){
            history.push('/');
        }
        
        const { match: { params } } = this.props;

        this.getPolls(params.pollid);


        var pusher = new Pusher('4702eba2086a27987735', { cluster: 'ap2' });

        // retrieve the socket ID once we're connected
        pusher.connection.bind('connected', () => {
            console.log("Socket ID inside ComponentDidMount"+pusher.connection.socket_id);
            this.state.socketId = pusher.connection.socket_id;
        });

        pusher.subscribe('poll-events')
            .bind('vote', function (data) {
                var pollId = data.pollId;
                var choice = data.choice;
                var voteCount = document.querySelector('#vote-count-' + data.questionId + '-' + choice);
                voteCount.textContent++;
                // we'll flash the colour for a moment
                var color = voteCount.style.color;
                var fontWeight = voteCount.style.fontWeight;
                setTimeout(function () {
                    voteCount.style.color = color;
                    voteCount.style.fontWeight = fontWeight;
                }, 3000);
                voteCount.style.color = 'green';
                voteCount.style.fontWeight = '900';
            });
    }

    // handleChange(e){
    //     // const formState = Object.assign({}, this.state.form);
    //     // formState[event.target.name] = event.target.value;
    //     // this.setState({form: formState});
    //     const state = {
    //         ...this.state,
    //         ["radio"]: {
    //         ...this.state["radio"],
    //         value: e.target.value,
    //         }
    //       };
    
    //       this.setState(state);
    //       console.log(this.state["radio"]);
    //     console.log("Form State : "+this.state);
    // }

    logout(){
        localStorage.clear();
        history.push('');
    }

    getPolls = async(pollid) => {

        let response = await fetch(`${this.serverdomain}/api/${pollid}`);
        let body = await response.json();

        if(response.status!=200){
            throw Error(body);
        }
        else{
            let poll = body[0];
            
            return this.setState({poll: poll, loading:false});
        }

    };



    render(){
        return(
            <div className="App"> 
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
                <div className="container-fluid">

                    {
                        this.state.poll!=null?
                        this.state.poll.questions.map((question, questionIndex) => 
                            <div className="col-md-12">
                                <Form id={question._id}>
                                <Panel bsStyle="primary">
                                    <Panel.Heading>{question.topic}</Panel.Heading>
                                    <ListGroup>
                                        {question.choices.map((choice, choiceIndex) => 
                                            <ListGroupItem>
                                                <label>{choice.value}</label>
                                                <span className="pull-right" id={"vote-count-"+question._id+"-"+choiceIndex}>{ choice.votes }</span>
                                            </ListGroupItem>
                                        )}
                                    </ListGroup>
                                   
                                </Panel>   
                                </Form>     
                            
                            </div>)
                        :<h1 className="text-center">Loading...</h1>
                    }
                </div>
            </div>

        );
    }
}

export default PollResult