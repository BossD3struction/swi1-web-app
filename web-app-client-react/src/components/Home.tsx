import {FC} from "react";
import {TokenStorageService} from "../services/TokenStorageService";
import {ApplicationService} from "../services/ApplicationService";

export const Home: FC = () => {

    let applicationService = new ApplicationService();
    let user = applicationService.initLoginResponse();
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
