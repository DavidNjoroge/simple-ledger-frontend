const develop = {
    ACCOUNT_SERVICE: "https://payment-wallet.herokuapp.com/",
};

const local = {
    ACCOUNT_SERVICE: "http://localhost:8080/",
};

const prod = {
    ACCOUNT_SERVICE: "https://payment-wallet.herokuapp.com/",
};


const choose = {
    "develop": develop,
    "local": local,
    "prod": prod
}

const config = process.env.REACT_APP_STAGE? choose[process.env.REACT_APP_STAGE]: choose['local']

export default { ...config };