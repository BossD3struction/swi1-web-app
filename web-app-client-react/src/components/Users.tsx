import React, {FC, useEffect, useMemo, useState} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {TokenStorageService} from "../services/TokenStorageService";
import {Models} from "./Models";
import {ApplicationService} from "../services/ApplicationService";
import DataTable, {TableColumn} from "react-data-table-component";
import {Button, TextField} from "@mui/material";
import {Container} from "react-bootstrap";

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
    }, [isUserLoggedIn, navigate, user.roles]);

    type DataRow = {
        id: number;
        username: string;
        email: string;
        password: string;
        admin: boolean;
    }

    const columns: TableColumn<DataRow>[] = [
        {
            name: '#',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'username',
            selector: row => row.username,
            sortable: true,
            wrap: true,
        },
        {
            name: 'email',
            selector: row => row.email,
            sortable: true,
            wrap: true,
        },
        {
            name: 'password',
            selector: row => row.password,
            wrap: true,
        },
        {
            name: 'admin',
            selector: row => row.admin ? 'yes' : 'no',
            sortable: true,
        },
    ]

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = users.filter(
        (item: { username: string; }) => item.username && item.username.toLowerCase().includes(filterText.toLowerCase()),
    );

    // @ts-ignore
    const FilterComponent = ({filterText, onFilter, onClear}) => (
        <>
            <TextField
                autoComplete="off"
                autoFocus
                id="search"
                type="text"
                label="Filter by username"
                aria-label="Search Input"
                value={filterText}
                onChange={onFilter}
            />
            <Button type="button" size="large" onClick={onClear}>
                X
            </Button>
        </>
    );

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent
                onFilter={(e: { target: { value: React.SetStateAction<string>; }; }) => setFilterText(e.target.value)}
                onClear={handleClear} filterText={filterText}/>
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <>
            <Models/>
            <Container className="mt-3">
                <DataTable
                    title="Users"
                    columns={columns}
                    data={filteredItems}
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    pagination
                    paginationResetDefaultPage={resetPaginationToggle}
                    striped
                />
            </Container>
        </>
    )
}
