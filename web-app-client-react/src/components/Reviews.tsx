import React, {FC, useEffect, useMemo, useState} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {TokenStorageService} from "../services/TokenStorageService";
import {Models} from "./Models";
import DataTable, {TableColumn} from "react-data-table-component";
import {User} from "../models/User";
import Movie from "../models/Movie";
import {Container} from "react-bootstrap";
import {Button, TextField} from "@mui/material";

export const Reviews: FC = () => {

    let tokenStorageService = new TokenStorageService();
    const isUserLoggedIn = tokenStorageService.getToken();
    const navigate = useNavigate();

    const [reviews, setReviews] = useState<any>([]);

    useEffect(() => {
        if (isUserLoggedIn === null) {
            navigate('/home');
        } else {
            axios.get("http://localhost:8080/review/list").then(response => {
                setReviews(response.data);
            })
        }
    }, [isUserLoggedIn, navigate]);

    type DataRow = {
        id: number;
        user: User;
        movie: Movie;
        text: string;
    }

    const columns: TableColumn<DataRow>[] = [
        {
            name: '#',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'user',
            selector: row => row.user.username,
            sortable: true,
            wrap: true,
        },
        {
            name: 'movie',
            selector: row => row.movie.name,
            sortable: true,
            wrap: true,
        },
        {
            name: 'text',
            selector: row => row.text,
            wrap: true,
        },
    ]

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = reviews.filter(
        (item: { user: User; }) => item.user.username && item.user.username.toLowerCase().includes(filterText.toLowerCase()),
    );

    // @ts-ignore
    const FilterComponent = ({filterText, onFilter, onClear}) => (
        <>
            <TextField
                autoComplete="off"
                autoFocus
                id="search"
                type="text"
                label="Filter by user"
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
                    title="Reviews"
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
