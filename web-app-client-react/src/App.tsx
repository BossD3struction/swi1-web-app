import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Container} from "react-bootstrap";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {MovieList} from "./components/MovieList";
import {Home} from "./components/Home";
import {Register} from "./components/Register";
import {Login} from "./components/Login";
import {NavigationBar} from "./components/NavigationBar";

function App() {
    return (
        <Router>
            <div className="container-fluid">
                <NavigationBar/>
                <Container>
                    <Routes>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/movies" element={<MovieList/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                    </Routes>
                </Container>
            </div>
        </Router>
    )
}

export default App;
