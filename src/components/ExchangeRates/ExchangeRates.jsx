import { useEffect, useState } from "react";
import styles from "./exchangerates.module.css";
import { toast } from "react-toastify";
import axios from "axios";

export const ExchangeRates = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await axios.get(
          "https://cbu.uz/uz/arkhiv-kursov-valyut/json/"
        );
        setData(req.data);
      } catch {
        toast.error("Problem with fetch exchange rates", {
          position: "top-center",
        });
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.div}>
      {data
        .filter(
          (item) =>
            item["Ccy"] == "USD" || item["Ccy"] == "EUR" || item["Ccy"] == "RUB"
        )
        .map((item) => {
          return (
            <p key={item.id}>
              1 {item.Ccy} = <span>{item.Rate} UZS</span>{" "}
              <img
                src={
                  item.Diff > 0
                    ? "../../src/assets/up.svg"
                    : "../../src/assets/down.svg"
                }
                alt=""
              />
            </p>
          );
        })}
    </div>
  );
};
