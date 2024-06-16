import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import { navTabData } from "../../exportDatas/navbar";
import { FaSearch } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { Button } from "../Button/Button";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export const Navbar = ({ changeLang }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const changeLangHandler = (e) => {
    changeLang(e.target.value);
  };
  const { pathname } = useLocation();
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.container + " container"}>
        <Link to="/" className={styles.logo}>
          BBC AUTO
        </Link>
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
        <label className={styles.label}>
          <input type="text" placeholder={t("navbar.input_placeholder")} />
          <FaSearch />
        </label>
        <select
          className={styles.select}
          onChange={changeLangHandler}
          value={localStorage.getItem("i18lng") || "uz"}
        >
          <option value="uz">O`zbekcha</option>
          <option value="ru">Русский</option>
        </select>
        {!pathname.includes("auth") ? (
          !localStorage.getItem("token") ? (
            <Link to={"/auth/signup"}>
              <Button
                content={t("navbar.button_content")}
                classname="register"
              />
            </Link>
          ) : (
            <div className={styles.user} onClick={logOut} >
              <CiLogout />
            </div>
          )
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  changeLang: PropTypes.func,
};
