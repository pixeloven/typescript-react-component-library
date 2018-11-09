import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost/",
});

interface RequestConfig extends AxiosRequestConfig {
    urlReplacements?: object;
}

function get(url: string, config?: RequestConfig) {
    const fullUrl = applyUrlReplacements(url, config ? config.urlReplacements : undefined);
    return axios.get(fullUrl, config);
}

function post(url: string, data: object, config: RequestConfig) {
    const fullUrl = applyUrlReplacements(url, config.urlReplacements);
    return axios.post(fullUrl, data, config);
}

/**
 * Fills in values for placeholders in URL
 * (ex. /api/endpoint/:id -> /api/endpoint/123)
 */
function applyUrlReplacements(url: string, replacements: object | undefined) {
    if (!replacements) { return url; }

    const re = new RegExp(Object.keys(replacements).join("|"), "gi");
    return url.replace(re, matched => replacements[matched]);
}

const HttpClient = {
    ...axiosInstance,
    get,
    post,
};

export default HttpClient;
