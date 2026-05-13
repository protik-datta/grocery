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
import PaymentSuccess from "./pages/paymentSuccess/PaymentSuccess";

const App = () => {
  return (
    <BrowserRouter>
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
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
        </Route>
        <Route path="/payment/success" element={<PaymentSuccess />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
