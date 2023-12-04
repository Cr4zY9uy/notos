import CART_ACTION from "./cart_action";
const updateLocalStorage = (state) => {
    localStorage.setItem("cart", JSON.stringify(state));
    return state;
}
const STATE = {
    cart: []
}
const initData = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : STATE;

const cart_reducer = (state = initData, action) => {
    switch (action.type) {
        case CART_ACTION.UPDATE_CART: return updateLocalStorage({ ...state, cart: action.payload });
        case CART_ACTION.DELETE_CART: return updateLocalStorage({ ...state, cart: [] });
        default: return state;
    }
}
export default cart_reducer;