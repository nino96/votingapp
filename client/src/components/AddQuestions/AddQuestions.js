import React, { Component } from "react";
import ReactDOM from 'react-dom';
import history from '../../history';
import Modal from 'react-modal'
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem , Button } from "react-bootstrap"; 
import AddQuestionModal from "../AddQuestionModal/AddQuestionModal";

import QuestionListTable from '../Tables/QuestionListTable';

class AddQuestions extends Component{

    constructor(props){
        super(props);
        this.serverdomain = 'https://votingapp-apachackathon.herokuapp.com:5777/api';
        this.state={
            showQuestionModal:false,
            questionListData:null
        };
        this.initialValue=2;
        this.numberOfOptions=[2,3,4];
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount(){
        console.log(localStorage.getItem('pollid'));
        if(!localStorage.getItem('user')){
            history.push('/');
        }
        else if(!localStorage.getItem('pollid')){
            history.push('/addPoll');
        }
        else{
            var pollid = localStorage.getItem('pollid');
            //var user = JSON.parse(localStorage.getItem('user'));
            //console.log("User ID : "+user.userid);
            fetch(`${this.serverdomain}/${pollid}`)
            .then(res => res.json())
            .then(jsonData => {
                console.log(jsonData);
                var questionList = [];

                jsonData[0].questions.map((question) => {
                    questionList.push({questionName:question.topic});
                });
                console.log(questionList);
                this.setState({questionListData:questionList});
            })
        }
    }


    openModal = () =>{
        
        this.setState({ showQuestionModal: true});
    }

    closeModal =() => {
        this.setState({ showQuestionModal: false})
    }   

    logout(){
        localStorage.clear();
        history.push('');
    }

    handleSubmitQuestion = ()=>{
        this.setState({showQuestionModal:false})
    }

    render(){
        let closeQuestionModal = () => this.setState({ showQuestionModal: false });
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

        <Button onClick={()=>{this.setState({showQuestionModal: true});}}>Add a new Question</Button>

        <AddQuestionModal  show={this.state.showQuestionModal} onHide={this.closeModal}/>

        {
            this.state.questionListData?
                
            <QuestionListTable data={this.state.questionListData}></QuestionListTable>:<div>No Polls</div>
        }

        <Button onClick={()=>{localStorage.removeItem('pollid'); history.push('/addPoll')}}>Finish</Button>

        </div>);
    }
}

export default AddQuestions;