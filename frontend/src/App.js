import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import { PrivateRoute } from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import {AdminRoute} from "./components/Routes/AdminRoute"
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import Users from './pages/admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/admin/Products';
import UpdateProduct from './pages/admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage'
import AdminOrders from './pages/admin/AdminOrders';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/product-details/:slug' element={<ProductDetails />} />
        <Route path='/search' element={<Search />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/categories' element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path='/dashboard/user' element={<Dashboard />} />
          <Route path='/dashboard/user/profile' element={<Profile />} />
          <Route path='/dashboard/user/orders' element={<Orders />} />
          
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
          <Route path='/dashboard/admin' element={<AdminDashboard />} />
          <Route path='/dashboard/admin/create-category' element={<CreateCategory />} />
          <Route path='/dashboard/admin/create-product' element={<CreateProduct />} />
          <Route path='/dashboard/admin/products' element={<Products />} />
          <Route path='/dashboard/admin/product/:slug' element={<UpdateProduct />} />
          <Route path='/dashboard/admin/users' element={<Users />} />
          <Route path='/dashboard/admin/orders' element={<AdminOrders/>} />
          </Route>
        <Route path='/signup' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path = '*' element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
