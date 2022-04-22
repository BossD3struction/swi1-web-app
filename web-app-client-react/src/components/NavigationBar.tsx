import {Dropdown, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {FC, useContext} from "react";
import {TokenStorageService} from "../services/TokenStorageService";
import {MyToastContext} from "../contexts/MyToastContext";
import {ApplicationService} from "../services/ApplicationService";

export const NavigationBar: FC = () => {

    let applicationService = new ApplicationService();
    let user = applicationService.initLoginResponse();
    let tokenStorageService = new TokenStorageService();
    const isUserLoggedIn = tokenStorageService.getToken();
    const {setShowToast}: any = useContext(MyToastContext);

    if (isUserLoggedIn !== null) {
        user = tokenStorageService.getUserOptimized();
    }

    function logout() {
        setShowToast(true);
        tokenStorageService.signOut();
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="px-3 mb-5">
            <Navbar.Brand href={'/home'}>Movie Reviews</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className="text-center">
                <Nav>
                    {isUserLoggedIn !== null &&
                        <>
                            <Link to={'/models'} className="nav-link">Models</Link>
                            <NavDropdown id="nav-dropdown-button" title="Management">
                                <Dropdown.Item href={'/movie-management'}>Movies</Dropdown.Item>
                                <Dropdown.Item disabled href="">Reviews</Dropdown.Item>
                                <Dropdown.Item disabled href="">Users</Dropdown.Item>
                                <Dropdown.Item disabled href="">Genres</Dropdown.Item>
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
                            <Link to={'/profile'} className="nav-link">{user.username}</Link>
                            <Link to={'/home'} onClick={logout} className="nav-link">Logout</Link>
                        </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
