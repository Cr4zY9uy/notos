import axios from "axios";

const api = axios.create({
    // baseURL: `http://139.180.186.20:3003/`,
    baseURL: `http://localhost:5000/`
});
export const updateJWT = (token) => {  // lần sau sử dụng api sẽ được đính kèm token vào sẵn
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
export default api;
