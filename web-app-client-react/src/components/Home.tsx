import {FC} from "react";
import {TokenStorageService} from "../services/TokenStorageService";
import LoginResponse from "../models/response/LoginResponse";

export const Home: FC = () => {

    let tokenStorageService = new TokenStorageService();
    const isUserLoggedIn = tokenStorageService.getToken();

    let user: LoginResponse = {
        username: "NaN",
        tokenType: "NaN",
        accessToken: "NaN",
        id: -101,
        email: "NaN",
        roles: ["NaN"]
    };
    if (isUserLoggedIn !== null) {
        user = tokenStorageService.getUserOptimized();
    }

    return (
        <div className="col">
            {isUserLoggedIn === null &&
                <div className="text-center alert alert-info">
                    We welcome you on our page, please login
                </div>
            }
            {isUserLoggedIn !== null &&
                <div className="text-center alert alert-primary">
                    Hello there <br/> <strong>{user.username}</strong> with <strong>{user.roles}</strong>
                </div>
            }
        </div>
    )
}
