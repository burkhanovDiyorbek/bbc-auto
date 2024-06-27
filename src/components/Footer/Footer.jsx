import { useTranslation } from "react-i18next";
import styles from "./footer.module.css";
import { navTabData } from "../../exportDatas/navbar";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";
import { IoLocation, IoMail } from "react-icons/io5";

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <div className={styles.container + " container"}>
        <div>
          <h2>BBC AUTO</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis
            necessitatibus nulla numquam earum odio praesentium placeat
            voluptate quas quos. Nam.
          </p>
        </div>
        <div>
          <h2>{t("footer.link")}</h2>
          <ul>
            {navTabData.map((item) => {
              return (
                <li key={item.id}>
                  <Link to={item.to}>{t(`navbar.${item.content}`)}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h2>{t("footer.socials")}</h2>
          <ul className={styles.socials}>
            <li>
              <Link>
                <FaTelegram />
              </Link>
            </li>
            <li>
              <Link>
                <FaFacebook />
              </Link>
            </li>
            <li>
              <Link>
                <FaInstagram />
              </Link>
            </li>
            <li>
              <Link>
                <FaTwitter />
              </Link>
            </li>
          </ul>
          <h2 style={{ marginTop: "10px" }}>{t("navbar.contact")}</h2>
          <ul className={styles.contact}>
            <li>
              <IoLocation />
              <p>Tashkent, Uzbekistan</p>
            </li>
            <li>
              <IoMail />
              <p>exaple@gmail.com</p>
            </li>
            <li>
              <FaPhone />
              <p>+998 (33) 340-02-03</p>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
