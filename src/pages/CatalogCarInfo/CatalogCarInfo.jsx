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
  const [sliderState, setSliderState] = useState(0);
  const { t, i18n } = useTranslation();
  const curLng = i18n.language;
  const { id } = useParams();

  useEffect(() => {
    setContentLoading(true);
    const fetchData = async () => {
      try {
        axios.get(`/catalog/car/${id}`).then((req) => {
          return setCarData(req.data);
        });

        axios
          .get(`/catalog/installmentplan/${id}`)
          .then((req) => setInstallmentPlanData(req.data));
      } catch (error) {
        toast.error(error.message, { position: "top-center" });
      } finally {
        setContentLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(installmentPlan);

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
      <div className={styles.container + " container"}>
        <div className={styles.row1}>
          <div className={styles["card-top"]}>
            <h2>{carData?.[`title_${curLng}`]}</h2>
            <p>{carData?.price}</p>
          </div>
          <div className={styles["card-img"]}>
            <div className={styles.img}>
              <img src={carData?.images[sliderState]?.image} alt="car" />
            </div>
            <div className={styles.slider}>
              {carData?.images?.map((img, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => setSliderState(index)}
                    className={index == sliderState ? styles.active : ""}
                  >
                    <img src={img.image} alt={index + "image"} />
                  </div>
                );
              })}
            </div>
          </div>
          <p
            className={styles.desc}
            dangerouslySetInnerHTML={{
              __html: carData?.[`description_${curLng}`]?.replaceAll(
                "\r\n",
                " <br />"
              ),
            }}
          />
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
        {installmentPlan?.car != null && (
          <CreditCalculator
            carData={carData}
            installmentplant={installmentPlan}
          />
        )}
      </div>
    </section>
  );
};

CatalogCarInfo.propTypes = {
  setContentLoading: PropTypes.func,
};
