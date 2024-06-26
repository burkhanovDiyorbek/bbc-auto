import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import { navTabData } from "../../exportDatas/navbar";
import { FaSearch } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { Button } from "../Button/Button";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Select } from "../Select/Select";
import React, { useRef, useState } from "react";
import { Time } from "../Time/Time";
import { ExchangeRates } from "../ExchangeRates/ExchangeRates";
import { IoIosMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

export const Navbar = React.memo(({ changeLang, setQ }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const searchValue = useRef("");

  const handleSearch = (e) => {
    e.preventDefault();
    const { current } = searchValue;
    setQ(current.value);
    navigate(`/search?q=${current.value}`);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  document.body.style = `overflow:${showMenu ? "hidden" : "auto"}`;

  return (
    <nav className={styles.navbar}>
      <div className={styles.top}>
        <Time />
        <div className={styles.wheather}></div>
        <p className={styles.alert}>{t("navbar.test")}</p>
        <ExchangeRates />
      </div>
      <div className={styles.container + " container"}>
        <Link to="/" className={styles.logo}>
          BBC AUTO
        </Link>
        <div
          className={`mob-icon desk-hide ${showMenu ? "icon-absolute" : ""}`}
          onClick={() => setShowMenu((prev) => !prev)}
        >
          {!showMenu ? <IoIosMenu /> : <IoCloseSharp />}
        </div>
        <div
          className={`menu mob-hide ${showMenu ? "menu-show" : "menu-hide"}`}
        >
          <ul className={styles.ul}>
            {navTabData.map((item) => {
              const { id, content, to } = item;
              return (
                <li key={id}>
                  <NavLink to={to}>{t(`navbar.${content}`)}</NavLink>
                </li>
              );
            })}
          </ul>
          <form onSubmit={handleSearch}>
            <label className={styles.label}>
              <input
                type="text"
                placeholder={t("navbar.input_placeholder")}
                ref={searchValue}
              />
              <FaSearch />
            </label>
          </form>
          <Select
            data={{
              className: "select",
              onchangefunc: changeLang,
              value: localStorage.getItem("i18lng") || "uz",
              options: [
                {
                  id: 0,
                  value: "uz",
                  content: "O'zbekcha",
                  imgUrl: "./../src/assets/uz.svg",
                },
                {
                  id: 1,
                  value: "ru",
                  content: "Русский",
                  imgUrl: "./../src/assets/ru.svg",
                },
              ],
            }}
          />
          {!pathname.includes("auth") ? (
            !localStorage.getItem("token") ? (
              <Link to={"/auth/signup"}>
                <Button
                  content={t("navbar.button_content")}
                  classname="register"
                />
              </Link>
            ) : (
              <div className={styles.user} onClick={logOut}>
                <CiLogout />
              </div>
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = "Navbar";

Navbar.propTypes = {
  changeLang: PropTypes.func,
  setQ: PropTypes.func,
};
