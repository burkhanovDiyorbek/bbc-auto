import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";
import PropTypes from "prop-types";

export const Layout = ({ changeLang ,setQ}) => {
  return (
    <>
      <Navbar changeLang={changeLang} setQ={setQ}/>
      <Outlet />
    </>
  );
};

Layout.propTypes = {
  changeLang: PropTypes.func,
  setQ: PropTypes.func,
};
