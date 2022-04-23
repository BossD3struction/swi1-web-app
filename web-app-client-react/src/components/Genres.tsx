import React, {FC, useEffect, useMemo, useState} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {TokenStorageService} from "../services/TokenStorageService";
import {Models} from "./Models";
import DataTable, {TableColumn} from "react-data-table-component";
import {Button, TextField} from "@mui/material";
import {Container} from "react-bootstrap";

export const Genres: FC = () => {

    let tokenStorageService = new TokenStorageService();
    const isUserLoggedIn = tokenStorageService.getToken();
    const navigate = useNavigate();

    const [genres, setGenres] = useState<any>([]);

    useEffect(() => {
        if (isUserLoggedIn === null) {
            navigate('/home');
        } else {
            axios.get("http://localhost:8080/genre/list").then(response => {
                setGenres(response.data);
            })
        }
    }, [isUserLoggedIn, navigate]);

    type DataRow = {
        id: number;
        name: number;
    }

    const columns: TableColumn<DataRow>[] = [
        {
            name: '#',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'name',
            selector: row => row.name,
            sortable: true,
            wrap: true,
        },
    ]

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = genres.filter(
        (item: { name: string; }) => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
    );

    // @ts-ignore
    const FilterComponent = ({filterText, onFilter, onClear}) => (
        <>
            <TextField
                autoComplete="off"
                autoFocus
                id="search"
                type="text"
                label="Filter by name"
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
                    title="Genres"
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
