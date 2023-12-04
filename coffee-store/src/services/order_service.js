import URL from "./url"
import api from "../api";

export const list_order = async (user_id) => {
    const url = URL.ORDER.LIST + user_id;
    console.log(user_id);
    try {
        const rs = await api.get(url)
        return rs.data;
    }
    catch (error) {
        console.error(error);
        return [];
    }
}
export const add_order = async (order) => {
    const url = URL.ORDER.ADD;
    try {
        const rs = await api.post(url, order)
        return rs.data;
    }
    catch (error) {
        console.log(error)
        return {};
    }
}
export const get_order_by_id = async (id) => {
    const url = URL.ORDER.GETBYID + id;
    try {
        const rs = await api.get(url);
        return rs.data;
    }
    catch (error) {
        console.log(error)
        return {};
    }
}
