import React from "react";
import Banner from "./components/Banner";
import Stats from "./components/Stats";
import Categories from "./components/Categories";
import PopularProducts from "./components/popularProduct/PopularProducts";
import PromoBanner from "./components/PromoBanner";
import Newsletter from "./components/Newsletter";

const Home = () => {
  return (
    <>
      <Banner />
      <Stats />
      <Categories />
      <PopularProducts />
      <PromoBanner />
      <Newsletter />
    </>
  );
};

export default Home;
