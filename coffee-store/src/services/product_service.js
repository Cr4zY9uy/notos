import URL from "./url"
import api from "../api";
export const paginate_product = async (page) => {
    const url = URL.PRODUCT.PAGINATE + "?_page=" + page;
    try {
        const rs = await api.get(url);
        return rs.data;
    }
    catch (error) {
        console.log(error)
        return [];
    }
}
export const detail_product = async (id) => {
    const url = URL.PRODUCT.DETAIL + id;
    try {
        const rs = await api.get(url);
        return rs.data;
    }
    catch (error) {
        console.log(error)
        return {};
    }
}
export const search_product = async (title) => {
    const url = URL.PRODUCT.SEARCH + "?_title=" + title;
    try {
        const rs = await api.get(url);
        return rs.data;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}
export const product_price = async (_startPrice, _endPrice, _page) => {
    const url = URL.PRODUCT.FILTERPRICE + "?_startPrice=" + _startPrice + "&_endPrice=" + _endPrice + "&_page=" + _page;
    try {
        const rs = await api.get(url);
        return rs.data;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}
export const product_price_cate = async (_startPrice, _endPrice, _category, _page) => {
    const url = URL.PRODUCT.FILTERPRICEANDCATE + "?_startPrice=" + _startPrice + "&_endPrice=" + _endPrice + "&_category=" + _category + "&_page=" + _page;
    try {
        const rs = await api.get(url);
        return rs.data;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}
export const list_product = async () => {
    const url = URL.PRODUCT.ALL;
    try {
        const rs = await api.get(url);
        return rs.data;
    }
    catch (error) {
        console.log(error)
        return [];
    }
}
export const limited_product = async () => {
    const url = URL.PRODUCT.LIMITED;
    try {
        const rs = await api.get(url);
        return rs.data;
    }
    catch (error) {
        console.log(error)
        return [];
    }
}
export const sales_product = async () => {
    const url = URL.PRODUCT.SALES;
    try {
        const rs = await api.get(url);
        return rs.data;
    }
    catch (error) {
        console.log(error)
        return [];
    }
}
export const new_product = async () => {
    const url = URL.PRODUCT.NEW;
    try {
        const rs = await api.get(url);
        return rs.data;
    }
    catch (error) {
        console.log(error)
        return [];
    }
}