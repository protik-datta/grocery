import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import Cart from "./pages/cart/Cart";
import DealsPage from "./pages/deals/DealsPage";
import ProductDetails from "./pages/productDetails/ProductDetails";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
