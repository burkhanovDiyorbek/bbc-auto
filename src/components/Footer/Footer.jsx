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
import { useEffect, useState } from "react";
import axios from "axios";

export const Footer = () => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/connection/contact/")
      .then((req) => setData(req.data.results[0]));
  }, []);

  console.log(data);

  return (
    <footer className={styles.footer}>
      <div className={styles.container + " container"}>
        <div>
          <h2>BBC AUTO</h2>
          <p>BBC avto ijara faqat mijozlarni o&apos;ylaydi</p>
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
              <Link target="_blank" to={data?.telegram}>
                <FaTelegram />
              </Link>
            </li>
            <li>
              <Link target="_blank" to={data?.facebook}>
                <FaFacebook />
              </Link>
            </li>
            <li>
              <Link target="_blank" to={data?.instagram}>
                <FaInstagram />
              </Link>
            </li>
            <li>
              <Link target="_blank" to={data?.twitter}>
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
              <p>{data?.email}</p>
            </li>
            <li>
              <FaPhone />
              <p>{data?.phone}</p>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
