import axios from "axios";
import config  from "./config";
import LedgerInterface, {LedgerDetailInterface} from "./shared/interfaces/LedgerInterface";
import {LedgerRequest} from "./components/create-ledger-button-and-modal/CreateLedger";
import {TransactionRequest} from "./components/create-transaction-button-and-modal/CreateTransaction";

const checkToken = (stat: number) => {
    if(stat===401) {
        document.location.href = '/#/login';
    }
};

export class BaseApi {
    baseUrl: string;
    constructor() {
        this.baseUrl = '';
    }

    createApi() {
        console.log('backend 1', this.baseUrl);

        return axios.create({
            baseURL: this.baseUrl,
            validateStatus: function (status: number): boolean {
                checkToken(status);
                return status.toString().includes("20");
            }
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
        }).catch(function (error) {
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            return Promise.reject(error)
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
    baseUrl: string;
    constructor() {
        super();
        this.baseUrl = config.ACCOUNT_SERVICE;
    }
}

export class DashboardService extends BaseApi {
    baseUrl: string;
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

    saveTransaction(ledgerId: number, payload: TransactionRequest): Promise<LedgerDetailInterface> {
        return this.post(`ledgers/${ledgerId}/transactions`, payload);
    }
}

export interface LoginRequestInterface {
    email: string,
    password: string
}


