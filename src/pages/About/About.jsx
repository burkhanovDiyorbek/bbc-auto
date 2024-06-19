import { useEffect, useState } from "react";
import styles from "./about.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { WorkersCard } from "../../components/WorkersCard/WorkersCard";
import { Services } from "../../components/ServicesCard/ServicesCard";

export const About = ({ setContentLoading }) => {
  const [aboutData, setAboutData] = useState({});
  const [workersData, setWorkersData] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const { t, i18n } = useTranslation();
  const curLng = i18n.language;

  useEffect(() => {
    const fetchData = async () => {
      setContentLoading(true);
      try {
        const req = await axios.get("/about/top");
        const reqWorkers = await axios.get("/about/workers");
        const reqServices = await axios.get("/about/services");
        setAboutData(req.data.results[0]);
        setWorkersData(reqWorkers.data.results);
        setServicesData(reqServices.data.results);
        setContentLoading(false);
      } catch (error) {
        toast.error(error.message, { position: "top-center" });
      }
    };
    fetchData();
  }, []);
  
  return (
    <div className={styles.about}>
      <div className={styles["about-container"] + " container"}>
        <div className={styles.top}>
          <div>
            <div className={styles.content}>
              <h2 className={styles.title}>{aboutData?.[`title_${curLng}`]}</h2>
              <p>{aboutData?.[`description_${curLng}`]}</p>
            </div>
            <div className={styles["card-img"]}>
              <img src={aboutData?.image} alt="" />
            </div>
          </div>
        </div>
        <div className={styles.slice}>
          <h2 className={styles.title}>{t("about_us.workers")}</h2>
          <div className={styles["services-cards"]}>
            {workersData.map((item) => (
              <WorkersCard key={item.id} item={item} />
            ))}
          </div>
        </div>
        <div className={styles.slice}>
          <h2 className={styles.title}>{t("about_us.services")}</h2>
          <div className={styles["services-cards"]}>
            {servicesData.map((item) => (
              <Services key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

About.propTypes = {
  setContentLoading: PropTypes.func,
};
