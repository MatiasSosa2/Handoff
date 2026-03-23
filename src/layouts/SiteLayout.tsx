import { Outlet } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import Chatbot from '../components/Chatbot';
import CustomCursor from '../components/CustomCursor';
import Footer from '../components/Footer';
import GlobalTexture from '../components/GlobalTexture';
import Navbar from '../components/Navbar';

export default function SiteLayout() {
  return (
    <>
      <GlobalTexture />
      <CustomCursor />
      <Navbar />
      <Chatbot />
      <div className="min-h-screen">
        <Breadcrumbs />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}