import { Route, Routes } from "react-router-dom";
import PagesLayout from "../layout/PagesLayout";
import HomeScreen from "../views/HomeScreen";

const RoutesPrincipal = () => {
  return (
    <Routes>
      <Route path="/" element={<PagesLayout />}>
        <Route index element={<HomeScreen />} />
      </Route>
    </Routes>
  );
};

export default RoutesPrincipal;
