import LoginResponse from "../models/response/LoginResponse";

export class ApplicationService {

    public initLoginResponse(): LoginResponse {
        return {
            username: "SpaceMagic",
            tokenType: "SpaceMagic",
            accessToken: "SpaceMagic",
            id: -101,
            email: "SpaceMagic",
            roles: ["SpaceMagic"]
        };
    }
}
