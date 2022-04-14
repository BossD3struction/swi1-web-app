import React, {FC, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {TokenStorageService} from "../services/TokenStorageService";
import {Nav} from "react-bootstrap";
import LoginResponse from "../models/response/LoginResponse";

export const Models: FC = () => {

    let tokenStorageService = new TokenStorageService();
    const isUserLoggedIn = tokenStorageService.getToken();

    let user: LoginResponse = {
        username: "SpaceMagic",
        tokenType: "SpaceMagic",
        accessToken: "SpaceMagic",
        id: -101,
        email: "SpaceMagic",
        roles: ["SpaceMagic"]
    };
    if (isUserLoggedIn !== null) {
        user = tokenStorageService.getUserOptimized();
        console.log(user.roles.toString());
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (isUserLoggedIn === null) {
            navigate('/home');
        }
    }, [isUserLoggedIn, navigate]);

    return (
        <>
            <Nav variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link href="/movies">Movies</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/reviews">Reviews</Nav.Link>
                </Nav.Item>
                {user.roles.toString() === "ROLE_ADMIN" &&
                    <>
                        <Nav.Item>
                            <Nav.Link href="/users">Users</Nav.Link>
                        </Nav.Item>
                    </>
                }
                {user.roles.toString() === "ROLE_USER" &&
                    <>
                        <Nav.Item>
                            <Nav.Link href="/users" disabled>Users</Nav.Link>
                        </Nav.Item>
                    </>
                }
                <Nav.Item>
                    <Nav.Link href="/genres">Genres</Nav.Link>
                </Nav.Item>
            </Nav>
        </>
    )
}
