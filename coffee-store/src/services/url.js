const URL = {
    PRODUCT: {
        ALL: 'product',
        PAGINATE: 'products',
        DETAIL: 'product/',
        SEARCH: 'products/search',
        FILTERPRICE: 'products/price',
        FILTERPRICEANDCATE: 'products/category',
        LIMITED: 'products/limited',
        SALES: 'products/sales',
        NEW: 'products/new',

    },
    CATEGORY: {
        LIST: 'category',
        CATEGORY_DETAIL: 'category/'
    },
    USER: {
        LOGIN: 'auth/login',
        REGISTER: 'auth/register',
        ADDFOC: 'user/foc',
        FORGOTPASS: '/forgot',
        RESETPASS: '/resetpass/',
        UPDATE: '/user/update'
    },
    FAVOURITE: {
        ADD: 'favourite/add',
        LIST: 'favourite/',
        MODIFY: 'favourite/modify',
        GETID: '/user/favourite/'
    },
    CART: {
        ADD: 'cart/add',
        LIST: 'cart/',
        MODIFY: 'cart/modify',
        GETBYID: 'user/cart/'
    },
    ORDER: {
        ADD: 'order/add',
        LIST: 'order/',
        GETBYID: 'orderdetail/'
    }
}
export default URL;