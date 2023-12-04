import './App.css';
import { Route, useParams } from 'react-router-dom';
import Header from './components/layouts/header';
import Navbars from './components/layouts/navbar';
import { Routes } from 'react-router-dom';
import Account from './components/pages/account';
import Home from './components/pages/home';
import Favourite from './components/pages/favourite';
import Login from './components/pages/login';
import Register from './components/pages/register';
import Products from './components/pages/products';
import Cart from './components/pages/cart';
import CategoryDetail from './components/pages/category_detail';
import Footer from './components/layouts/footer';
import Product from './components/pages/product';
import Orders from './components/pages/orders';
import OrdersDetail from './components/pages/orderetail';
import { useLocation } from 'react-router-dom';
import ForgotPass from './components/pages/forgotpass';
import ResetPass from './components/pages/resetpass';
import Checkout from './components/pages/checkout';
import Search from './components/pages/search';
function App() {
  const location = useLocation();
  const hideHeaderOnLogin = location.pathname === '/login' || location.pathname === '/sign-up' || location.pathname.includes('/resetpass') || location.pathname === '/forgotpass';
  return (
    <div className="App">
      {!hideHeaderOnLogin && <Header />}
      {!hideHeaderOnLogin && <Navbars />}
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/category/:name' element={<CategoryDetail />} />
          <Route path='/products' element={<Products />} />
          <Route path='/search/:pro' element={<Search />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/sign-up' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgotpass' element={<ForgotPass />} />
          <Route path='/resetpass/:rid' element={<ResetPass />} />
          <Route path='/favourite' element={<Favourite />} />
          <Route path='/account' element={<Account />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/orderdetail/:detail' element={<OrdersDetail />} />
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
        {!hideHeaderOnLogin && <Footer />}
      </main>
    </div>
  );
}

export default App;
