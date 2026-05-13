import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./shared/components/layout/Layout";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import Cart from "./pages/cart/Cart";
import DealsPage from "./pages/deals/DealsPage";
import ProductDetails from "./pages/productDetails/ProductDetails";
import SearchPage from "./pages/search/SearchPage";
import OrderPage from "./pages/orders/OrderPage";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";
import { Toaster } from "react-hot-toast";
import PaymentFailed from "./pages/payment/PaymentFailed";
import NotFound from "./shared/components/common/NotFound";
import ProtectedRoute from "./shared/components/routes/ProtectedRoute";
import AuthRoute from "./shared/components/routes/AuthRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Cart />
      <Routes>
        {/* public routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/products/:category/:slug"
            element={<ProductDetails />}
          />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/deals" element={<DealsPage />} />
          {/* protected route */}
          <Route element={<ProtectedRoute />}>
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/fail" element={<PaymentFailed />} />
          </Route>
        </Route>
        {/* auth route */}
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        {/* 404 not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
