import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Main = () => {
  const location = useLocation();
  const hideFooterOnRoutes = ["/adminDashboard"];

  const shouldHideFooter = hideFooterOnRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div>
      <NavBar />
      <Outlet />
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default Main;
