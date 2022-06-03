import axios from "axios";

const BASE_URL = "https://jamalecomm.herokuapp.com/api/";
const TOKEN = localStorage.getItem("persist:root") !== null? (JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken):(" ")
//const TOKEN = ""
//console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin)

export const publicRequest = axios.create({
    baseURL:BASE_URL,
})

export const userRequest = axios.create({
    baseURL:BASE_URL,
    headers:{token:`Bearer ${TOKEN}`}
})

