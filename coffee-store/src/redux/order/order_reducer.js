import ORDER_ACTION from "./order_action";
const updateLocalStorage = (state) => {
    localStorage.setItem("order", JSON.stringify(state));
    return state;
}
const STATE = {
    order: [],
}
const initData = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : STATE;

const order_reducer = (state = initData, action) => {
    switch (action.type) {
        case ORDER_ACTION.UPDATE_ORDER: return updateLocalStorage({ ...state, order: action.payload });
        case ORDER_ACTION.DELETE_ORDER: return updateLocalStorage({ ...state, order: action.payload });
        default: return state;
    }
}
export default order_reducer;