import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";
import PropTypes from "prop-types";
import { Footer } from "./Footer/Footer";

export const Layout = ({ changeLang ,setQ}) => {
  return (
    <>
      <Navbar changeLang={changeLang} setQ={setQ}/>
      <Outlet />
      <Footer/>
    </>
  );
};

Layout.propTypes = {
  changeLang: PropTypes.func,
  setQ: PropTypes.func,
};
