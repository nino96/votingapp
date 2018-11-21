import React, { Component } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome'
import classNames from 'classnames';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import {ToastContainer, ToastStore} from 'react-toasts';
import history from '../../history';


class AddQuestionModal extends Component {
    constructor(props) {
        super(props);

        this.state={
            question : "",
            choices:[],
            noOfChoices : 2,
            choice1:"",
            choice2:"",
            choice3:"",
            choice4:"",
            choiceFlags: {
            choice1flag:true,
            choice2flag:true,
            choice3flag:false,
            choice4flag:false
            }
        };
        this.initialValue=2;
        this.numberOfOptions=[2,3,4];

        this.handleSubmit = this.handleSubmit.bind(this);
    
    }

    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }

    DropDownChange = event => {
        var noOfChoices = parseInt(event.target.value);
        this.setState({"noOfChoices":noOfChoices});

        console.log("No of Choices"+noOfChoices);

        var choiceFlags = {"choice1flag":true, "choice2flag":true, "choice3flag":true, "choice4flag":true};
        console.log(choiceFlags);
        //this.setState({choices:[]});
        //var choices = [];
        switch(noOfChoices){
            case 2:
                choiceFlags.choice3flag = false;
                choiceFlags.choice4flag = false;
                break;
            case 3:
                choiceFlags.choice4flag = false;
                break;
            case 4:
                break;
            default: choiceFlags.choice3flag = false;
                    choiceFlags.choice4flag = false;
                    break;
        }

        console.log(choiceFlags);
        this.setState({choiceFlags:choiceFlags});

        
    }

    handleSubmit(){
        var pollid=localStorage.getItem('pollid');
        var choices=[];
        var choice={};
        var topic = this.state.question;

        if(this.state.choiceFlags.choice1flag)
        {
            choice.value=this.state.choice1;
            choice.votes=0;
            choices.push(choice);
            if(this.state.choiceFlags.choice2flag)
            {
                choice = {};
                choice.value=this.state.choice2;
                choice.votes=0;
                choices.push(choice);
                if(this.state.choiceFlags.choice3flag)
                {   
                    choice = {}
                    choice.value=this.state.choice3;
                    choice.votes=0
                    choices.push(choice)
                    if(this.state.choiceFlags.choice4flag)
                    {
                        choice = {}
                        choice.value=this.state.choice4;
                        choice.votes=0
                        choices.push(choice)
                    }   
                }   
            }   
        }
        
        console.log(pollid);
        fetch(`http://localhost:3002/api/addQuestionToPoll`, {
            method: 'POST',
            headers: new Headers({'Content-Type':'application/json'}),
            body: JSON.stringify({pollid:pollid,topic:topic,choices:choices})
        }).then(res => res.json())
        .then(jsonData => {
            console.log(jsonData);
            ToastStore.success("Question Added", 1500);
            this.props.onHide();
            window.location.reload();
        })

    }

    render(){
        return (
            <div>
            <Modal
            {...this.props}
            bsSize="large"
            aria-labelledby="contained-modal-title-lg"
            onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">Add Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="Question" bsSize="large">
                        <ControlLabel>Question</ControlLabel>
                        <FormControl
                        autoFocus
                        type="text"
                        id="question"
                        value={this.state.question}
                        onChange={this.handleChange}
                        />
                    </FormGroup>
                    <div className="form-group">
                               <select className="form-control" id="noOfChoices" value={this.state.noOfChoices} onChange={this.DropDownChange} >
                                <option selected disabled hidden value=''> Choose Number of Options </option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                </select>
                    </div>

                     <ControlLabel>Choices</ControlLabel>
                    <FormGroup>
                       
                        <FormControl type={this.state.choiceFlags.choice1flag? "text":"hidden"} id="choice1" value={this.state.choice1} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                        <FormControl type={this.state.choiceFlags.choice2flag? "text":"hidden"} id="choice2" value={this.state.choice2} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                        <FormControl type={this.state.choiceFlags.choice3flag? "text":"hidden"} id="choice3" value={this.state.choice3} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                        <FormControl type={this.state.choiceFlags.choice4flag? "text":"hidden"} id="choice4" value={this.state.choice4} onChange={this.handleChange}/> 
                    </FormGroup>
                    
                </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" type="submit" value="Add Question" onClick={this.handleSubmit}>Add Question</Button>
                </Modal.Footer>
            </Modal>
            
            <ToastContainer position={ToastContainer.POSITION.TOP_CENTER} store={ToastStore}/>
            </div>
        );
    }
}

export default AddQuestionModal;
