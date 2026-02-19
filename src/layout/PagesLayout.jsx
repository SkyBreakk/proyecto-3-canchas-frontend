import { Outlet } from "react-router-dom";

const PagesLayout = () => {
  return (
    <>
      <header></header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};

export default PagesLayout;
