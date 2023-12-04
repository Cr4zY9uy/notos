import ORDER_DETAIL_ACTION from "./orderdetail_action";
const updateLocalStorage = (state) => {
    localStorage.setItem("order_detail", JSON.stringify(state));
    return state;
}
const STATE = {
    order_detail: []
}
const initData = localStorage.getItem("order_detail") ? JSON.parse(localStorage.getItem("order_detail")) : STATE;

const order_detail_reducer = (state = initData, action) => {
    switch (action.type) {
        case ORDER_DETAIL_ACTION.UPDATE_ORDER_DETAIL: return updateLocalStorage({ ...state, order_detail: action.payload });
        case ORDER_DETAIL_ACTION.DELETE_ORDER_DETAIL: return updateLocalStorage({ ...state, order_detail: [] });
        default: return state;
    }
}
export default order_detail_reducer;