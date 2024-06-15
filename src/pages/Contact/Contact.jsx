import { useEffect, useState } from "react";
import styles from "./contact.module.css";
import axios from "axios";
import { FaTelegram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Contact = ({ setContentLoading }) => {
  const [contactData, setContactData] = useState([{}]);
  const [locationData, setLocation] = useState([{}]);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      setContentLoading(true);
      try {
        const req = await axios.get("/connection/contact/");
        const reqLoc = await axios.get("/connection/location/");
        setContactData(req.data.results);
        setLocation(reqLoc.data.results);
        setContentLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const { phone, email, telegram, instagram, facebook } = contactData[0];
  const { lat, long, location } = locationData[0];
  return (
    <section className={styles.section + " container"}>
      <div className={styles["contact-container"]}>
        <div className={styles["contact-info"]}>
          <div>
            <p className={styles["info-title"]}>{t("contact.1.title")}</p>
            <ul>
              <li>{t("contact.1.desc")}</li>
              <li>
                {t("contact.1.phone")} {phone}
              </li>
              <li>
                {t("contact.1.email")} {email}
              </li>
            </ul>
          </div>
          <div>
            <p className={styles["info-title"]}>{t("contact.2.title")}</p>
            <ul className={styles.socials}>
              <li>
                <Link to={telegram}>
                  <FaTelegram />
                </Link>
              </li>
              <li>
                <Link to={instagram}>
                  <FaInstagram />
                </Link>
              </li>
              <li>
                <Link to={facebook}>
                  <FaFacebook />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginBottom: "20px",
            }}
          >
            {<IoLocationOutline />}
            {location}
          </h2>
          <iframe
            src={`https://maps.google.com/maps?q=${lat},${long}&z=${16}&output=embed`}
            width="560"
            height="400"
            allowFullScreen={true}
          ></iframe>
        </div>
      </div>
    </section>
  );
};

Contact.propTypes = {
  setContentLoading: PropTypes.func,
};
