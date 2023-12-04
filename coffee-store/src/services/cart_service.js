import URL from "./url"
import api from "../api";

export const list_cart = async (user_id) => {
    const url = URL.CART.LIST + user_id;
    try {
        const rs = await api.get(url)
        return rs.data;
    }
    catch (error) {
        console.error(error);
        return [];
    }
}
export const add_cart = async (cart) => {
    const url = URL.CART.ADD;
    try {
        const rs = await api.post(url, cart)
        return rs.data;
    }
    catch (error) {
        console.log(error)
        return [];
    }
}
export const modify_cart = async (cart) => {
    const url = URL.CART.MODIFY;
    try {
        const rs = await api.put(url, cart)
        return rs.data;
    }
    catch (error) {
        console.log(error)
        return {};
    }
}
export const get_cart_id = async (user_id) => {
    const url = URL.CART.GETBYID + user_id;
    try {
        const rs = await api.get(url)
        return rs.data;
    }
    catch (error) {
        console.log(error)
        return {};
    }
}

