import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { FaCarRear, FaRoad } from "react-icons/fa6";
import { IoIosColorFill } from "react-icons/io";
import PropTypes from "prop-types";
import styles from "./catalogcarinfo.module.css";
import { GiDivingDagger } from "react-icons/gi";
import { CreditCalculator } from "../../components/CreditCalculator/CreditCalculator";

export const CatalogCarInfo = ({ setContentLoading }) => {
  const [carData, setCarData] = useState(null);
  const [installmentPlan, setInstallmentPlanData] = useState(null);
  const { t, i18n } = useTranslation();
  const curLng = i18n.language;
  const { id } = useParams();

  useEffect(() => {
    setContentLoading(true);
    const fetchData = async () => {
      try {
        const [carResponse, installmentResponse] = await Promise.all([
          axios.get(`/catalog/car/${id}/`),
          axios.get(`/catalog/installmentplan/${id}`),
        ]);
        setCarData(carResponse.data);
        setInstallmentPlanData(installmentResponse.data);
      } catch (error) {
        toast.error(error.message, { position: "top-center" });
      } finally {
        setContentLoading(false);
      }
    };
    fetchData();
  }, [id, setContentLoading]);


  return (
    <section className={styles.section}>
      <div className="section-header">
        <div className="section-header_content">
          <h2>{t("catalog.card_details")}</h2>
          <p>
            <Link to={"/"}>{t("navbar.home")}</Link> {"> "}
            <Link to={"/catalog"}>{t("navbar.catalog")}</Link> {"> "}
            {t("catalog.card_details")}
          </p>
        </div>
      </div>
      <div className={styles.container+" container"}>
        <div className={styles.row1}>
          <div className={styles["card-top"]}>
            <h2>{carData?.[`title_${curLng}`]}</h2>
            <p>{carData?.price}</p>
          </div>
          <div className={styles["card-img"]}>
            <img src={carData?.image} alt="car" />
          </div>
          <p className={styles.desc}>{carData?.[`description_${curLng}`]}</p>
          <div className={styles.inform}>
            <h2>{t("catalog.characteristics")}</h2>
            <ul>
              <li>
                <FaCarRear />
                <p>
                  {t("catalog.year")} <span>{carData?.year} y</span>
                </p>
              </li>
              <li>
                <IoIosColorFill />
                <p>
                  {t("catalog.color")}{" "}
                  <span>{carData?.[`color_${curLng}`]}</span>
                </p>
              </li>
              <li>
                <FaRoad />
                <p>
                  {t("catalog.distance")} <span>{carData?.km} km</span>
                </p>
              </li>
              <li>
                <GiDivingDagger />
                <p>
                  {t("catalog.sort_all_type")}:{" "}
                  <span>
                    {carData?.mechanic
                      ? t("catalog.mechanic")
                      : t("catalog.automatic")}
                  </span>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <CreditCalculator
          carData={carData}
          installmentplant={installmentPlan}
        />
      </div>
    </section>
  );
};

CatalogCarInfo.propTypes = {
  setContentLoading: PropTypes.func,
};
