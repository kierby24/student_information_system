import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost/student_information_system/backend/api/"
});

export default API;