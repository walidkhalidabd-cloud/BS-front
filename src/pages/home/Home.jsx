import { Outlet } from "react-router-dom";
import MainNavBar from "../../Components/home/MainNavBar";
import ScrollToTopButton from "../../Components/shared/ScrollToTopButton;";
import Footer from "../../Components/shared/Footer";

export default function Home() {
  return (
    <>
      <MainNavBar />
      <main>        
        <Outlet />
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
