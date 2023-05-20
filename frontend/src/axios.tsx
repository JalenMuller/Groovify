import Axios from "axios";

const axios = Axios.create({
    baseURL: "https://groovify.jalenmuller.com/api",
    // baseURL: "http://localhost:8000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default axios;
