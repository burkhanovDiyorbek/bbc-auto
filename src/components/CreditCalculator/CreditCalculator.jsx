import styles from "./creditcalculator.module.css";
import { useState } from "react";
import { Button } from "../Button/Button";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export const CreditCalculator = ({ installmentplant, carData }) => {
  const [month, setMonth] = useState(installmentplant?.subs?.[0].duration);
  const [percent, setPercent] = useState(
    installmentplant?.subs?.[0].annual_interest_rate || 0
  );
  const [downPayment, setDownPayment] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(6);
  const [totalPayment, setTotalPayment] = useState(0);
  const { t } = useTranslation();

  console.log(installmentplant);

  const calculateLoan = (
    totalLoan,
    initialPayment,
    loanTerm,
    annualInterestRate
  ) => {
    const loanAmount = totalLoan - initialPayment;
    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const monthlyPaymentCalc =
      (loanAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, loanTerm)) /
      (Math.pow(1 + monthlyInterestRate, loanTerm) - 1);

    setMonthlyPayment(monthlyPaymentCalc.toFixed(2));
    setTotalPayment((monthlyPaymentCalc * loanTerm).toFixed(2));
  };
  
  return (
    <div className={styles.row2}>
      <h2>{t("catalog.calculate")}</h2>
      <label>
        <p>{t("catalog.down_payment")}</p>
        <input
          type="number"
          placeholder="0 $"
          value={downPayment}
          onInput={(e) => setDownPayment(e.target.value)}
        />
      </label>
      <div className={styles.month}>
        <p>{t("catalog.period_month")}</p>
        <div className={styles.month_btns}>
          {installmentplant?.subs?.map((item) => (
            <p
              key={item?.duration}
              onClick={() => {
                setMonth(item?.duration);
                setPercent(item?.annual_interest_rate);
              }}
              className={
                month == item?.duration ? `active_month p_month` : "p_month"
              }
            >
              {item?.duration}
            </p>
          ))}
        </div>
      </div>
      <label>
        <p>{t("catalog.interest_rate")}</p>
        <input type="text" disabled value={`${percent}%`} />
      </label>
      <label>
        <p>Siz to`laysiz</p>
        <ul>
          <li>
            <p>Oylik:</p>
            <input disabled value={monthlyPayment}></input>
          </li>
          <li>
            <p>Umumiy:</p>
            <input disabled value={totalPayment}></input>
          </li>
        </ul>
      </label>
      <Button
        content={"Calculate"}
        classname="register"
        clickFunc={() => {
          calculateLoan(
            parseFloat(carData?.price),
            downPayment,
            month,
            percent
          );
        }}
        isEmpty={!(month > 0) && !(percent > 0)}
      />
    </div>
  );
};

CreditCalculator.propTypes = {
  carData: PropTypes.any,
  installmentplant: PropTypes.any,
};
