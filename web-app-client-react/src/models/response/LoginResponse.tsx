export default interface LoginResponse {
    tokenType: string;
    accessToken: string;
    id: number;
    username: string;
    email: string;
    roles: string[];
}
