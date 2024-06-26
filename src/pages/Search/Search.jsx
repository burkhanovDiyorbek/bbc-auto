import { useEffect, useState } from "react";
import styles from "./search.module.css";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { CarCard } from "../../components/CarCard/CarCard";
import { NewsCard } from "../../components/NewsCard/NewsCard";

export const Search = ({ setContentLoading, q = "" }) => {
  const [newsData, setNewData] = useState("");
  const [carsData, setCarsData] = useState("");
  const { t, i18n } = useTranslation();
  const curLng = i18n.language;
  const qVal = q;

  useEffect(() => {
    const fetchData = async () => {
      setContentLoading(true);
      try {
        const reqNews = await axios.get("/news/news/");
        const reqCars = await axios.get("/catalog/car");
        setCarsData(
          reqCars.data.results?.filter((item) =>
            item?.[`title_${curLng}`]
              ?.toLowerCase()
              ?.includes(qVal?.toLowerCase())
          )
        );
        setNewData(
          reqNews.data.results?.filter((item) =>
            item?.[`title_${curLng}`]
              ?.toLowerCase()
              ?.includes(qVal?.toLowerCase())
          )
        );
        setContentLoading(false);
      } catch (error) {
        toast.error(error.message, { position: "top-center" });
      }
    };
    fetchData();
  }, [qVal, setContentLoading, curLng]);
  return (
    <div className={styles.container + " container"}>
      <h2>
        {newsData.length || carsData.length
          ? t(`search.res`)
          : t(`search.res_error`)}{" "}
        {qVal && `"${qVal}"`}
      </h2>
      {carsData.length > 0 && (
        <>
          <h2>{t("search.cars")}</h2>
          <div className="cards">
            {carsData.map((item) => {
              return <CarCard item={item} key={item.id} />;
            })}
          </div>
        </>
      )}
      {newsData.length > 0 && (
        <>
          <h2>{t("search.news")}</h2>
          <div className={styles["news-cards"]}>
            {newsData.map((item) => {
              return <NewsCard item={item} key={item.id} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

Search.propTypes = {
  setContentLoading: PropTypes.func,
  q: PropTypes.string,
};
