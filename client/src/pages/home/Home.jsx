import Banner from "./components/Banner";
import Stats from "./components/Stats";
import Categories from "./components/Categories";
import PopularProducts from "./components/popularProduct/PopularProducts";
import PromoBanner from "./components/PromoBanner";
import Newsletter from "./components/Newsletter";
import OrganicProducts from './components/popularProduct/OrganicProducts';

const Home = () => {
  return (
    <>
      <Banner />
      <Stats />
      <Categories />
      <PopularProducts />
      <OrganicProducts/>
      <PromoBanner />
      <Newsletter />
    </>
  );
};

export default Home;
