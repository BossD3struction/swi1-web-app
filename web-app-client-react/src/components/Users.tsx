import React, {FC, useEffect, useState} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {TokenStorageService} from "../services/TokenStorageService";
import {Models} from "./Models";
import {ApplicationService} from "../services/ApplicationService";

export const Users: FC = () => {

    let applicationService = new ApplicationService();
    let user = applicationService.initLoginResponse();
    let tokenStorageService = new TokenStorageService();
    const isUserLoggedIn = tokenStorageService.getToken();
    const navigate = useNavigate();

    const [users, setUsers] = useState<any>([]);

    if (isUserLoggedIn !== null) {
        user = tokenStorageService.getUserOptimized();
    }

    useEffect(() => {
        if (isUserLoggedIn === null || user.roles.toString() === 'ROLE_USER') {
            navigate('/home');
        } else {
            axios.defaults.headers.common = {'Authorization': `Bearer ${isUserLoggedIn}`}
            axios.get("http://localhost:8080/user/list").then(response => {
                setUsers(response.data);
            })
        }
    }, [isUserLoggedIn, navigate]);

    return (
        <>
            <Models/>
            <div className="mt-3 card-body">
                <h2>Users</h2>
                <div className="table-responsive-sm">
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">username</th>
                            <th scope="col">email</th>
                            <th scope="col">password</th>
                            <th scope="col">is user admin?</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user: any) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                {user.admin ? <td>yes</td> : < td>no</td>}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
