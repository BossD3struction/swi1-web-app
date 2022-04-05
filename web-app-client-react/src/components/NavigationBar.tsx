import {Dropdown, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {FC} from "react";

export const NavigationBar: FC = () => {
    return (
        <Navbar bg="light" expand="lg" className="px-3 mb-5">
            <Navbar.Brand>Movie Reviews</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className="text-center">
                <Nav>
                    <Link to={'/home'} className="nav-link">Home</Link>
                    <Link to={'/movies'} className="nav-link">Movies</Link>
                </Nav>
                <Nav className="ms-auto">
                    <Dropdown.Divider/>
                    <Link to={'/register'} className="nav-link">Register</Link>
                    <Link to={'/login'} className="nav-link">Login</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
