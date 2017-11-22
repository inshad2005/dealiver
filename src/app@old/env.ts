const HTTP_TIMEOUT: number = 60000;

export interface Environment {
    mainApi: string;
    analytics?: string;
    timeout: number;
    debug: boolean;
    bypass: boolean;
    angularProd: boolean;
}

export const LOCAL: Environment = {
    mainApi: 'http://78.47.222.237:8480/esb/api/fsp',
    timeout: HTTP_TIMEOUT,
    debug: true,
    bypass: true,
    angularProd: false
};

export const DEV: Environment = {
    mainApi: 'http://52.15.178.19:3001/api/',
    timeout: HTTP_TIMEOUT,
    debug: true,
    bypass: false,
    angularProd: false
};



export const PROD: Environment = {
    mainApi: 'http://52.15.178.19:3001/api/',
    timeout: HTTP_TIMEOUT,
    debug: false,
    bypass: false,
    angularProd: false
};

export const ENV: Environment =PROD;