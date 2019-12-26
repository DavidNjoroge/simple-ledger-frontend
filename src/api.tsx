import axios from "axios";
import config  from "./config";
import LedgerInterface, {LedgerDetailInterface} from "./shared/interfaces/LedgerInterface";
import {LedgerRequest} from "./components/create-ledger-button-and-modal/CreateLedger";

const checkToken = (stat: any) => {
    if(stat===401) {
        document.location.href = '/#/login';
    }
};




export class BaseApi {
    baseUrl: string;
    constructor() {
        this.baseUrl = '';
        // this.api = this.createApi();
    }

    createApi() {
        return axios.create({
            baseURL: this.baseUrl,
            validateStatus: function (status: any) {
                checkToken(status);
                return status.toString().includes("20");
            }
      
        }); 
    }

    downloadApi() {
        return axios.create({
            baseURL: this.baseUrl,
            validateStatus: function (status) {
                checkToken(status);
                return status.toString().includes("20");
            },
            responseType: 'arraybuffer'
        });
    } 

    get(url: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.createApi().get(url);
                return resolve(res.data);
            }
            catch (error) {
                if (error.response) {
                    const errors = error.response.data.errors;
                    for (const key in errors) {
                        if (errors.hasOwnProperty(key)) {
                        }
                    }
                    reject(error);
                }
            }
        });
    }

    post(url: string, data: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.createApi().post(url, data);
                return resolve(res.data);
            }
            catch (error) {
                if (error.response) {
                    const errors = error.response.data.errors;
                    for (const key in errors) {
                        if (errors.hasOwnProperty(key)) {
                        }
                    }
                    reject(error);
                }
            }
        });
    }


}
export class AccountService extends BaseApi {
    baseUrl: any;
    constructor() {
        super()
        this.baseUrl = config.ACCOUNT_SERVICE;
    }
}

export class DashboardService extends BaseApi {
    baseUrl: any;
    constructor() {
        super();
        this.baseUrl = config.ACCOUNT_SERVICE;
    }

    getLedgers(): Promise<LedgerInterface[]> {
        return this.get("ledgers");
    }

    getLedgerDetail(id: number): Promise<LedgerDetailInterface> {
        return this.get(`ledgers/${id}`);
    }

    saveLedger(payload: LedgerRequest): Promise<LedgerDetailInterface> {
        return this.post("ledgers", payload);
    }
}

export interface LoginRequestInterface {
    email: string,
    password: string
}


