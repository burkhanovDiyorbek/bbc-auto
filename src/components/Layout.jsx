import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";
import PropTypes from "prop-types";

export const Layout = ({ changeLang }) => {
  return (
    <>
      <Navbar changeLang={changeLang} />
      <Outlet />
    </>
  );
};

Layout.propTypes = {
  changeLang: PropTypes.func,
};
