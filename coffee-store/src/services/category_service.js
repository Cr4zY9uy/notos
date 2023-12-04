import URL from "./url"
import api from "../api";
export const list_category = async () => {
    const url = URL.CATEGORY.LIST;
    try {
        const rs = await api.get(url);
        return rs.data;
    }
    catch (error) {
        console.log(error)
        return [];
    }
}
export const detail_category = async (category) => {
    const url = URL.CATEGORY.CATEGORY_DETAIL + category;
    try {
        const rs = await api.get(url);
        return rs.data.products;
    }
    catch (error) {
        console.log(error)
        return [];
    }
}
