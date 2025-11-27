import { Outlet } from "react-router-dom";
import UpperNav from "../../Components/shared/UpperNav";
import MainNavBar from "../../Components/shared/MainNavBar";
import ScrollToTopButton from "../../Components/shared/ScrollToTopButton;";
import Footer from "../../Components/shared/Footer";

export default function Home() {
  return (
    <>
      <UpperNav />
      <MainNavBar />
      <main>
        <Outlet />
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
