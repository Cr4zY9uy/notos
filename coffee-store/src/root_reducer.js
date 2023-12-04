import { combineReducers } from "redux";
import cart_reducer from "./redux/cart/cart_reducer";
import user_reducer from "./redux/user/user_reducer";
import favourite_reducer from "./redux/favourite/favourite_reducer";
import order_reducer from "./redux/order/order_reducer";
import order_detail_reducer from "./redux/orderdetails/orderdetail_reducer";
const root_reducer = combineReducers({
    cart_reducer,
    user_reducer,
    favourite_reducer,
    order_reducer,
    order_detail_reducer
})
export default root_reducer;