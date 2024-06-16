import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { FaCarRear, FaRoad } from "react-icons/fa6";
import { IoPricetags } from "react-icons/io5";
import { IoIosColorFill } from "react-icons/io";
import PropTypes from "prop-types";
import styles from "./catalogcarinfo.module.css";
import { GiDivingDagger } from "react-icons/gi";
import { Button } from "../../components/Button/Button";

export const CatalogCarInfo = ({ setContentLoading }) => {
  const [carData, setCarData] = useState([]);
  const [installmentplant, setInstallmentplantData] = useState([]);
  const [month, setMonth] = useState(12);
  const [percent, setPercent] = useState(30);
  const [downPayment, setDownPaymet] = useState(0);
  const { t, i18n } = useTranslation();
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const curLng = i18n.language;
  const { id } = useParams();

  function calculateLoan(
    totalLoan,
    initialPayment,
    loanTerm,
    annualInterestRate
  ) {
    let loanAmount = totalLoan - initialPayment;

    let monthlyInterestRate = annualInterestRate / 100 / 12;

    setTotalPayment((monthlyPayment * loanTerm).toFixed(2));

    setMonthlyPayment(
      (
        (loanAmount *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, loanTerm)) /
        (Math.pow(1 + monthlyInterestRate, loanTerm) - 1)
      ).toFixed(2)
    );
  }
  useEffect(() => {
    setContentLoading(true);
    const fetchData = async () => {
      try {
        const req = await axios.get(`/catalog/car/${id}/`);
        const reqPlant = await axios.get(`/catalog/installmentplan/${id}`);
        setCarData(req.data);
        setInstallmentplantData(reqPlant.data);
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
        <h2>{t("catalog.card_details")}</h2>
        <p>
          <Link to={"/"}>{t("navbar.home")}</Link> {"> "}
          <Link to={"/catalog"}>{t("navbar.catalog")}</Link> {"> "}
          {t("catalog.card_details")}
        </p>
      </div>
      <div className="container">
        <div className={styles.row1}>
          <div className={styles["card-top"]}>
            <h2>{carData[`title_${curLng}`]}</h2>
            <p>{carData.price}</p>
          </div>
          <div className={styles["card-img"]}>
            <img src={carData.image} alt="this is a car img" />
          </div>
          <p>{carData[`description_${curLng}`]}</p>
          <div className={styles.inform}>
            <h2>{t("catalog.characteristics")}</h2>
            <ul>
              <li>
                <FaCarRear />
                <p>
                  {t("catalog.year")} <span> {carData.year}</span>
                </p>
              </li>
              <li>
                <IoIosColorFill />
                <p>
                  {t("catalog.color")} <span>{carData[`color_${curLng}`]}</span>
                </p>
              </li>
              <li>
                <FaRoad />
                <p>
                  {t("catalog.distance")} <span>{carData.km}</span>
                </p>
              </li>
              <li>
                <GiDivingDagger />
                <p>
                  {t("catalog.sort_all_type")}
                  {": "}
                  <span>
                    {carData.mechanic
                      ? t("catalog.mechanic")
                      : t("catalog.automatic")}
                  </span>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.row2}>
          <h2>{t("catalog.calculate")}</h2>
          <label>
            <p>{t("catalog.down_payment")}</p>
            <input
              type="number"
              placeholder="0 $"
              onChange={(e) => setDownPaymet(e.target.value)}
            />
          </label>
          <div className={styles.month}>
            <p>{t("catalog.period_month")}</p>
            {installmentplant &&
              installmentplant.subs &&
              installmentplant?.subs.map((item) => {
                return (
                  <p
                    key={item.duration}
                    onClick={() => {
                      setMonth(item.duration);
                      setPercent(item.annual_interest_rate);
                    }}
                  >
                    {item.duration}
                  </p>
                );
              })}
          </div>
          <label>
            <p>{t("catalog.interest_rate")}</p>
            <input type="text" disabled value={percent + "%"} />
          </label>
          <label>
            <p>Siz to`laysiz</p>
            <ul>
              <li>
                <span>Oylik:</span>
                <input disabled value={monthlyPayment}></input>
              </li>
              <li>
                <span>Umumiy:</span>
                <input disabled value={totalPayment}></input>
              </li>
            </ul>
          </label>
          <Button
            content={"Calculate"}
            classname="register"
            clickFunc={() => {
              calculateLoan(
                parseInt(carData.price),
                downPayment,
                month,
                percent
              );
            }}
          />
        </div>
      </div>
    </section>
  );
};

CatalogCarInfo.propTypes = {
  setContentLoading: PropTypes.func,
};
