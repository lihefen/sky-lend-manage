import { parseSearch } from 'app/lib/parseSearch';
let NodeEnv = process.env.NODE_ENV;

let { env } = parseSearch(location.search);
NodeEnv = env ? env : NodeEnv;
const baseUrl = {
    production: window.location.origin,
    staging: window.location.origin,
    development: "//123.60.107.0:8080",
    dev: window.location.origin,
    pre: window.location.origin,
    online: window.location.origin,
    mock: "/mock",
    test: "//123.60.107.0:8080",
};

try {
    if (sessionStorage.getItem("_debug_pre") == 1) {
        NodeEnv = "pre";
    }
} catch (error) {
    NodeEnv = "production";
}
export let domain = baseUrl[NodeEnv] || window.location.origin;
/* eslint-disable */

export const smartNairaUrl = (url, { env } = {}) => {
    // if(NodeEnv == 'development') {
    //     return `/${env}${url}`;
    // }
    // return `http://123.60.107.0${url}`;

    return `https://app.smartnaira.top${url}`
};
