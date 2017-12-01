const HTTP_TIMEOUT: number = 60000;

export interface Environment {
    mainApi: string;
    imgApi:string;
    analytics?: string;
    timeout: number;
    debug: boolean;
    bypass: boolean;
    angularProd: boolean;
}

export const LOCAL: Environment = {
    mainApi: 'http://127.0.0.1:3002',
    imgApi:'http://18.220.217.121/dealiver-rest-apis/public/img/profile_imgs/',
    timeout: HTTP_TIMEOUT,
    debug: true,
    bypass: true,
    angularProd: false
};
// http://18.220.217.121/dealiver-admin-apis/www/images/
export const DEV: Environment = {
    mainApi: 'http://52.15.178.19:3001/api/',
    imgApi:'http://18.220.217.121/dealiver-rest-apis/public/img/profile_imgs/',
    timeout: HTTP_TIMEOUT,
    debug: true,
    bypass: false,
    angularProd: false
};



export const PROD: Environment = {
    mainApi: 'http://18.220.217.121:3002',
    imgApi:'http://18.220.217.121/dealiver-rest-apis/public/img/profile_imgs/',
    timeout: HTTP_TIMEOUT,
    debug: false,
    bypass: false,
    angularProd: false
};

export const ENV: Environment =PROD;