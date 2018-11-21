import React, { Component } from 'react';
import {Form, Badge, Panel, Radio, ListGroup, ListGroupItem, Button, Row,Col,Navbar, Nav, NavItem, MenuItem, NavDropdown, DropdownButton, Glyphicon,Tabs,Tab} from 'react-bootstrap';
import './Poll.css';
import axios from 'axios';
import {ToastContainer, ToastStore} from 'react-toasts';

import Pusher from 'pusher-js';

class Poll extends React.Component{
    constructor(props){
        super(props);
        this.serverdomain = 'http://localhost:3002';
        this.socketId = null;
        this.state = {
            pollid:'',
            poll:null,
            loading: true,
            socketId:null
        }
        this.handleVote = this.handleVote.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getPolls = this.getPolls.bind(this);
    }

    // componentWillReceiveProps(){
    //     console.log("Poll ID : "+this.props.match.params.pollid);
    //     this.setState({pollid:this.props.match.params.pollid});
    // }

    componentDidMount(){
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

    handleChange(e){
        // const formState = Object.assign({}, this.state.form);
        // formState[event.target.name] = event.target.value;
        // this.setState({form: formState});
        const state = {
            ...this.state,
            ["radio"]: {
            ...this.state["radio"],
            value: e.target.value,
            }
          };
    
          this.setState(state);
          console.log(this.state["radio"]);
        console.log("Form State : "+this.state);
    }

    handleVote = (e) => {
        e.preventDefault();

        var pollId = this.state.poll._id;
        var questionId = e.target.id;

        if(this.state["radio"]){
            var choice = this.state["radio"].value;
            

            console.log("ID : "+pollId);
            console.log("choice : "+this.state["radio"].value);

            console.log("Socket ID"+this.socketId);

            axios.post(`${this.serverdomain}/api/` + pollId + '/' + questionId + '/vote', {choice: choice, socketId: this.state.socketId})
            .then(res => {this.getPolls(this.state.poll.pollid)})
            .catch(err => console.log(err));

            document.querySelector('#vote-btn-' + questionId).disabled = true;
            var voteCount = document.querySelector('#vote-count-' + questionId + '-' + choice);
                voteCount.style.color = 'blue';
                voteCount.style.fontWeight = '900';
            }
        else{
            // alert("Please select an option");
            ToastStore.error("Please select an option", 1500);
        }

        //this.getPolls(this.state.poll.pollid);
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
                <div className="container-fluid">

                    {
                        this.state.poll!=null?
                        this.state.poll.isActive?
                        this.state.poll.questions.map((question, questionIndex) => 
                            <div className="col-md-12">
                                <Form onSubmit={this.handleVote} id={question._id}>
                                <Panel bsStyle="primary">
                                    <Panel.Heading>{question.topic}</Panel.Heading>
                                    <ListGroup>
                                        {question.choices.map((choice, choiceIndex) => 
                                            <ListGroupItem>
                                                <Radio name={question.topic} value={choiceIndex} inline onChange={this.handleChange}>{choice.value}</Radio>
                                                <span className="pull-right" id={"vote-count-"+question._id+"-"+choiceIndex}>{ choice.votes }</span>
                                            </ListGroupItem>
                                        )}
                                    </ListGroup>
                                    <Panel.Footer>
                                        <Button id={"vote-btn-"+question._id} bsStyle="primary" type="submit">Vote</Button>
                                    </Panel.Footer>
                                </Panel>   
                                </Form>     
                            
                            </div>):<h1 className="text-center">This Poll has been closed</h1>
                        :<h1 className="text-center">Loading...</h1>
                    }
                    <ToastContainer position={ToastContainer.POSITION.TOP_CENTER} store={ToastStore}/>
                </div>
            </div>

        );
    }
}

export default Poll