import axios from "axios";
import config  from "./config";
import LedgerInterface from "./shared/interfaces/LedgerInterface";

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



    download(url: string) {
        // this.props.toggleLoader(true);
        return new Promise(async (resolve, reject) => {
              try {
                const res = await this.downloadApi().get(url);
                // this.props.toggleLoader(false);
                return resolve(res);
            }
            catch (error) {
                if (error.response) {
                    const errors = error.response.data.errors;
                    for (const key in errors) {
                        if (errors.hasOwnProperty(key)) {
                            const element = errors[key];
                            // this.props.createMessage('error', element);
                        }
                    }
                    // this.props.toggleLoader(false);
                    reject(error);
                }
            }
        });
    }

    // delete(url, data) {
    //     this.props.toggleLoader(true);
    //     return new Promise((resolve, reject) => {
    //           return this.createApi().delete(url, data).then(res => {
    //             this.props.toggleLoader(false);
    //             return resolve(res);
    //         }).catch(error=> {
    //             if (error.response) {
    //                 const errors = error.response.data.errors;
    //                 for (const key in errors) {
    //                     if (errors.hasOwnProperty(key)) {
    //                         const element = errors[key];
    //                         this.props.createMessage('error', element);
    //                     }
    //                 }
    //                 this.props.toggleLoader(false);
    //                 reject(error);
    //             }
    //         });
    //     });
    // }

    // post(url, data) {
    //     this.props.toggleLoader(true);
    //     // debugger
    //     return new Promise((resolve, reject) => {
    //         return this.createApi().post(url, data).then(res => {
    //             this.props.toggleLoader(false);
    //             return resolve(res);
    //         }).catch(error=> {
    //           if (error.response) {
    //               const errors = error.response.data.errors;
    //               for (const key in errors) {
    //                   if (errors.hasOwnProperty(key)) {
    //                       const element = errors[key];
    //                       this.props.createMessage('error', element);
    //                   }
    //               }
    //               this.props.toggleLoader(false);
    //               reject(error);
    //           }
    //       });
    //     });
    // }

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
      super()
    this.baseUrl = config.ACCOUNT_SERVICE;
  }

  getLedgers(): Promise<LedgerInterface[]> {
    return this.get("ledgers");
}
}
