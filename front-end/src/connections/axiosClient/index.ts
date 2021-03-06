import Axios from "axios";
import queryString from "query-string";

// const baseURL = "https://smartlightheroku.herokuapp.com/api";
const baseURL = "http://localhost:5000/api";

const axiosCient = Axios.create({
    baseURL: baseURL,
    headers: {
        "content-type": "application/json",
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosCient.interceptors.request.use(async (config) => {
    // Handle token here...
    return config;
});

axiosCient.interceptors.response.use(
    (res) => {
        if (res && res.data) {
            return res.data;
        }

        return res;
    },
    (err) => {
        // Handle error
        throw err;
    },
);

export default axiosCient;
