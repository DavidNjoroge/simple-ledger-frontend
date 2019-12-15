const develop = {
    ACCOUNT_SERVICE: "http://localhost:8000/",
    OPERATION_SERVICE: "http://localhost:8000/"
};

const local = {
    ACCOUNT_SERVICE: "http://localhost:8000/",
    OPERATION_SERVICE: "http://localhost:8000/"
};

const prod = {
    ACCOUNT_SERVICE: "http://localhost:8000/",
    OPERATION_SERVICE: "http://localhost:8000/"
};


const choose = {
    "develop": develop,
    "local": local,
    "prod": prod
}

const config = process.env.REACT_APP_STAGE? choose[process.env.REACT_APP_STAGE]: choose['local']

export default { ...config };