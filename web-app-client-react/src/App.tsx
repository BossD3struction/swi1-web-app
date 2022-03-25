import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import MovieList from "./components/MovieList";
import EmptyComponent from "./components/EmptyComponent";


function App() {

    return (
        <Router>
            <div className="container movie-app">
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand>Movie Reviews</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Link to={'/home'} className="nav-link">Home</Link>
                                <Link to={'/movies/list'} className="nav-link">Movies</Link>
                                <Nav.Link href="#link">Link</Nav.Link>
                                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Routes>
                    <Route path="/movies/list" element={<MovieList/>}/>
                    <Route path="/home" element={<EmptyComponent/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
