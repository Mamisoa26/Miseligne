import React, { Component } from 'react';
import './menu.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse } from "mdbreact";
import ListTout from "../../liste/liste";
export default class Menu extends Component {
    state = {
        modal1: false,
        modal2: false,
        modal3: false,
        modal4: false,
        modal5: false,
        collapseID: "",
        redirect: false
    }
    toggleCollapse = collapseID => () => this.setState(prevState => ({
        collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

    toggle = nr => () => {
        let modalNumber = "modal" + nr; this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }
    render() {
        return (
            <div>
                
                <MDBNavbar color="#d05c62" dark expand="md" id="navbar">
                    <MDBNavbarBrand>
                        <div id="contentlogo"><img src="logo.png" alt="logo" id="logo" /></div>
                        
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse3")} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar>
                        <MDBNavbarNav left>
                            
                            <MDBNavItem >
                                <MDBNavLink to="/" className="nav-header">Accueil</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to="/tousLesAteliers" className="nav-header">Liste</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                {/* <MDBNavLink to="#!" className="nav-header">Contacts</MDBNavLink> */}
                            </MDBNavItem>
                        </MDBNavbarNav>
                        <MDBNavbarNav right>
                            <MDBNavItem>
                                <MDBNavLink to="/login" className="nav-header" rounded onClick={this.toggle(1)}>Connexion</MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            
            <div><Router>

            <Route exact path="/tousLesAteliers" component={ListTout} />
                </Router>
            </div>
            </div>
        );
    }
}