import {FC, useEffect} from "react";
import {TokenStorageService} from "../services/TokenStorageService";
import {useNavigate} from "react-router-dom";
import {Container} from "react-bootstrap";
import {ApplicationService} from "../services/ApplicationService";

export const Profile: FC = () => {

    let applicationService = new ApplicationService();
    let user = applicationService.initLoginResponse();
    let tokenStorageService = new TokenStorageService();
    const isUserLoggedIn = tokenStorageService.getToken();
    const navigate = useNavigate();

    if (isUserLoggedIn !== null) {
        user = tokenStorageService.getUserOptimized();
    }

    useEffect(() => {
        if (isUserLoggedIn === null) {
            navigate('/home');
        }
    }, [isUserLoggedIn, navigate]);

    return (
        <>
            <Container className="mt-3 jumbotron">
                <Container className="jumbotron">
                    <h3>
                        <strong>{user.username}</strong>
                    </h3>
                    <hr/>
                    <h5 className="mt-3">
                        <strong>Email: </strong>
                        {user.email}
                    </h5>
                    <h5 className="mt-3">
                        <strong>Role: </strong>
                        <span>{user.roles}</span>
                    </h5>
                </Container>
            </Container>
        </>
    )
}
