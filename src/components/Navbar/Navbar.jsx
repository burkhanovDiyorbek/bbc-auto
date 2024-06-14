import { Link, NavLink } from "react-router-dom";
import styles from "./navbar.module.css";
import { navTabData } from "../../exportDatas/navbar";
import { FaSearch } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { Button } from "../Button/Button";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export const Navbar = ({ changeLang }) => {
  const { t } = useTranslation();
  const changeLangHandler = (e) => {
    changeLang(e.target.value);
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
          value={localStorage.getItem("i18lng")}
        >
          <option value="uz">O`zbekcha</option>
          <option value="en">English</option>
        </select>
        {!localStorage.getItem("token") ? (
          <Link to={"/auth/signup"}>
            <Button content={t("navbar.button_content")} classname="register" />
          </Link>
        ) : (
          <div className={styles.user}>
            <CiUser />
          </div>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  changeLang: PropTypes.func,
};
