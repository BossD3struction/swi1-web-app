import {FC} from "react";
import {TokenStorageService} from "../services/TokenStorageService";
import LoginResponse from "../models/response/LoginResponse";

export const Home: FC = () => {

    let user: LoginResponse = {
        username: "SpaceMagic",
        tokenType: "SpaceMagic",
        accessToken: "SpaceMagic",
        id: -101,
        email: "SpaceMagic",
        roles: ["SpaceMagic"]
    };
    let tokenStorageService = new TokenStorageService();
    const isUserLoggedIn = tokenStorageService.getToken();

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
