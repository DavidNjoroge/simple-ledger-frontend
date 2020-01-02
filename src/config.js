const develop = {
    ACCOUNT_SERVICE: "https://payment-wallet.herokuapp.com/",
};

const local = {
    ACCOUNT_SERVICE: "http://localhost:8080/",
};

const prod = {
    ACCOUNT_SERVICE: "https://payment-wallet.herokuapp.com/",
};

const cluster = {
    ACCOUNT_SERVICE: process.env.REACT_APP_BACKEND,
};


const choose = {
    "develop": develop,
    "local": local,
    "prod": prod,
    "cluster": cluster
};

const config = process.env.REACT_APP_STAGE? choose[process.env.REACT_APP_STAGE]: choose['develop'];

export default { ...config };
