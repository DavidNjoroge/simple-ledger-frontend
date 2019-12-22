import config from "../config";
import LoginResponse from "../shared/interfaces/LoginResponse";
import { BaseApi, LoginRequestInterface } from "../api";


export class AuthService extends BaseApi {
    baseUrl: any;
    constructor() {
        super();
        this.baseUrl = config.ACCOUNT_SERVICE;
    }
    login(loginRequest: LoginRequestInterface): Promise<LoginResponse> {
        return this.post("auth/login", loginRequest);
    }
}
