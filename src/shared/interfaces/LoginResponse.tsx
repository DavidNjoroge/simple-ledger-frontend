import UserPrincipalInterface from "./UserPrincipalInterface";
export default interface LoginResponse {
    userPrincipal: UserPrincipalInterface;
    accessToken: string;
}
