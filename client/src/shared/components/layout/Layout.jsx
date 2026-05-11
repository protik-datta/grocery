import { Outlet } from "react-router-dom";
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const Layout = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />

      <main className='flex-1'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
