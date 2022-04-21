import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Container} from "react-bootstrap";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Movies} from "./components/Movies";
import {Home} from "./components/Home";
import {Register} from "./components/Register";
import {Login} from "./components/Login";
import {NavigationBar} from "./components/NavigationBar";
import {MyToastContext} from "./contexts/MyToastContext";
import {MyToast} from "./components/MyToast";
import {Models} from "./components/Models";
import {Reviews} from "./components/Reviews";
import {Users} from "./components/Users";
import {Genres} from "./components/Genres";
import {MoviesManagement} from "./components/MoviesManagement";
import {Profile} from "./components/Profile";

function App() {

    const [showToast, setShowToast] = useState(false);

    return (
        <Router>
            <div className="container-fluid">
                <MyToastContext.Provider value={{showToast, setShowToast}}>
                    <NavigationBar/>
                    <Container>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/home" element={<Home/>}/>
                            <Route path="/models" element={<Models/>}/>
                            <Route path="/movies" element={<Movies/>}/>
                            <Route path="/reviews" element={<Reviews/>}/>
                            <Route path="/users" element={<Users/>}/>
                            <Route path="/genres" element={<Genres/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/movie-management" element={<MoviesManagement/>}/>
                        </Routes>
                        <MyToast/>
                    </Container>
                </MyToastContext.Provider>
            </div>
        </Router>
    )
}

export default App;
