import {FC, useEffect, useState} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {TokenStorageService} from "../services/TokenStorageService";
import {Models} from "./Models";

export const Reviews: FC = () => {

    let tokenStorageService = new TokenStorageService();
    const isUserLoggedIn = tokenStorageService.getToken();
    const url = "http://localhost:8080/review/list";

    const [reviews, setReviews] = useState<any>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (isUserLoggedIn === null) {
            navigate('/home');
        } else {
            axios.get(url).then(response => {
                setReviews(response.data)
            })
        }
    }, [isUserLoggedIn, navigate, url]);
    return (
        <>
            <Models/>
            <div className="card-body">
                <h2>Reviews</h2>
                <div className="table-responsive-sm">
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">user</th>
                            <th scope="col">movie</th>
                            <th scope="col">text</th>
                        </tr>
                        </thead>
                        <tbody>
                        {reviews.map((review: any) => (
                            <tr key={review.id}>
                                <td>{review.id}</td>
                                <td>{review.user.username}</td>
                                <td>{review.movie.name}</td>
                                <td>{review.text}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
