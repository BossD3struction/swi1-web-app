import React, {FC, useEffect, useMemo, useState} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {TokenStorageService} from "../services/TokenStorageService";
import {Models} from "./Models";
import DataTable, {ExpanderComponentProps, TableColumn} from 'react-data-table-component';
import {Button, TextField} from "@mui/material";
import {Container} from "react-bootstrap";

export const Movies: FC = () => {

    let tokenStorageService = new TokenStorageService();
    const isUserLoggedIn = tokenStorageService.getToken();
    const navigate = useNavigate();

    const [movies, setMovies] = useState<any>([]);

    useEffect(() => {
        if (isUserLoggedIn === null) {
            navigate('/home');
        } else {
            axios.get("http://localhost:8080/movie/list").then(response => {
                setMovies(response.data);
            })
        }
    }, [isUserLoggedIn, navigate]);

    type DataRow = {
        id: number;
        name: number;
        year: number;
        runningTime: number;
        bannerLink: string,
        about: string;
        genres: any;
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
            width: '280px',
        },
        {
            name: 'year',
            selector: row => row.year,
            sortable: true,
            width: '120px',
        },
        {
            name: 'running time',
            selector: row => row.runningTime,
            sortable: true,
            width: '120px',
        },
        {
            name: 'banner link',
            selector: row => row.bannerLink,
            wrap: true,
            width: '320px',
        },
        {
            name: 'about',
            selector: row => row.about,
            wrap: true,
            width: '1000px',
        },
    ]

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = movies.filter(
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

    const ExpandedComponent: React.FC<ExpanderComponentProps<DataRow>> = ({data}) => {
        return <pre>genres: {JSON.stringify(data.genres, null, 2)}</pre>;
    };

    return (
        <>
            <Models/>
            <Container className="mt-3">
                <DataTable
                    title="Movies"
                    columns={columns}
                    data={filteredItems}
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    pagination
                    paginationResetDefaultPage={resetPaginationToggle}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
                    striped
                />
            </Container>
        </>
    )
}
