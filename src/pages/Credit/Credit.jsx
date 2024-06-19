import { useTranslation } from "react-i18next";
import styles from "./credit.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import axios from "axios";
import { Button } from "../../components/Button/Button";

export const Credit = ({ setContentLoading }) => {
  const [creditData, setCreditData] = useState([]);
  const { i18n, t } = useTranslation();
  const curLng = i18n.language;
  useEffect(() => {
    const fetchData = async () => {
      setContentLoading(true);
      try {
        const req = await axios.get("/credit-conditions/info/");
        setCreditData(req.data.results);
        setContentLoading(false);
      } catch (error) {
        toast.error(error.message, { position: "top-center" });
      }
    };
    fetchData();
  }, []);
  return (
    <section className={styles.section}>
      <div className="section-header">
        <div className="section-header_content">
          <h2>{t("navbar.credit")}</h2>
          <p>
            <Link to={"/"}>{t("navbar.home")}</Link> {">"} {t("navbar.credit")}
          </p>
        </div>
      </div>
      <div className="container">
        <div className={styles.content}>
          <img src={creditData[0]?.file} />
          <h2>{creditData[0]?.[`title_${curLng}`]}</h2>
          <p>
            {creditData[0]?.[`description_${curLng}`].replaceAll("<br/>", "\n")}
          </p>
          <Link to={"/catalog"}>
            <Button classname="home" content={t("navbar.catalog")} />
          </Link>
        </div>
      </div>
    </section>
  );
};

Credit.propTypes = {
  setContentLoading: PropTypes.func,
};
