import URL from "./url"
import api from "../api";

export const login = async (user) => {
    const url = URL.USER.LOGIN;

    console.log(user);
    try {
        const rs = await api.post(url, user)
        // api.defaults.headers.common["Authorization"] = `Bearer ${rs.data.token}`;
        return rs.data;
    }
    catch (error) {
        console.log(error)
        return {};
    }
}
export const register = async (user) => {
    const url = URL.USER.REGISTER;
    try {
        const rs = await api.post(url, user)
        return rs.data;
    }
    catch (error) {
        console.log(error)
        return {};
    }
}
export const addFOC = async (data) => {
    const url = URL.USER.ADDFOC;
    try {
        const rs = await api.put(url, data)
        return rs.data;
    }
    catch (error) {
        console.log(error)
        return {};
    }
}
export const ForgotPassword = async (data) => {
    const url = URL.USER.FORGOTPASS;
    try {
        const rs = await api.post(url, data);
        return rs.data;
    } catch (error) {
        console.log(error);
    }
}
export const ResetPassword = async (id, data) => {

    const url = URL.USER.RESETPASS + id;
    try {
        const rs = await api.put(url, data);
        return rs.data;
    } catch (error) {
        console.log(error);
    }
}
export const Update = async (data) => {

    const url = URL.USER.UPDATE;
    try {
        const rs = await api.put(url, data);
        return rs.data;
    } catch (error) {
        console.log(error);
    }
}