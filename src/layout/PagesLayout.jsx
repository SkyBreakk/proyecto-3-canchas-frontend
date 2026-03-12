import { Outlet } from "react-router-dom";
import HeaderApp from "../components/HeaderApp";
import FooterApp from "../components/FooterApp";

const PagesLayout = () => {
  return (
    <>
      <header>
        <HeaderApp />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <FooterApp />
      </footer>
    </>
  );
};

export default PagesLayout;
