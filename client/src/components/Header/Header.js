import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap"; 

class Header extends Component{

    constructor(props){
        super(props);
    }


    render(){
        return(
            <Navbar fluid collapseOnSelect>
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
            </Navbar>
        );
    }


}

export default Header