import {Dropdown, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {FC, useContext} from "react";
import {TokenStorageService} from "../services/TokenStorageService";
import {ToastContext} from "../contexts/ToastContext";

export const NavigationBar: FC = () => {

    let tokenStorageService = new TokenStorageService();
    const isUserLoggedIn = tokenStorageService.getToken();

    const {setShow}: any = useContext(ToastContext);

    function logout() {
        setShow(true);
        tokenStorageService.signOut();
    }

    return (
        <Navbar bg="light" expand="lg" className="px-3 mb-5">
            <Navbar.Brand href={'/home'}>Movie Reviews</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className="text-center">
                <Nav>
                    {isUserLoggedIn !== null &&
                        <>
                            <Link to={'/models'} className="nav-link">Models</Link>
                            <NavDropdown id="nav-dropdown-button" title="Management">
                                <Dropdown.Item href={'/movie-management'}>Movies</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </NavDropdown>
                        </>
                    }
                </Nav>
                <Nav className="ms-auto">
                    <Dropdown.Divider/>
                    {isUserLoggedIn === null &&
                        <>
                            <Link to={'/register'} className="nav-link">Register</Link>
                            <Link to={'/login'} className="nav-link">Login</Link>
                        </>
                    }
                    {isUserLoggedIn !== null &&
                        <>
                            <Link to={'/home'} onClick={logout} className="nav-link">Logout</Link>
                        </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
