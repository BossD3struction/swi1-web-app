import React, {FC, useEffect, useState} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {TokenStorageService} from "../services/TokenStorageService";
import {Models} from "./Models";

export const Users: FC = () => {

    let tokenStorageService = new TokenStorageService();
    const isUserLoggedIn = tokenStorageService.getToken();
    const url = "http://localhost:8080/user/list";

    const [users, setUsers] = useState<any>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (isUserLoggedIn === null) {
            navigate('/home');
        } else {
            axios.defaults.headers.common = {'Authorization': `Bearer ${isUserLoggedIn}`}
            axios.get(url).then(response => {
                setUsers(response.data)
            })
        }
    }, [isUserLoggedIn, navigate, url]);
    return (
        <>
            <Models/>
            <div className="card-body">
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
