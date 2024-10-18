/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import Proptypes from "prop-types";
import styles from "./news.module.css";
import { FaRegNewspaper } from "react-icons/fa";
import { NewsCard } from "../../components/NewsCard/NewsCard";

const month = {
  "01_uz": "Yanvar",
  "02_uz": "Fevral",
  "03_uz": "Mart",
  "04_uz": "Aprel",
  "05_uz": "May",
  "06_uz": "Iyun",
  "07_uz": "Iyul",
  "08_uz": "Avgust",
  "09_uz": "Sentabr",
  "10_uz": "Oktabr",
  "11_uz": "Noyabr",
  "12_uz": "Dekabr",
  "01_ru": "Январь",
  "02_ru": "Февраль",
  "03_ru": "Март",
  "04_ru": "Апрель",
  "05_ru": "Май",
  "06_ru": "Июнь",
  "07_ru": "Июль",
  "08_ru": "Август",
  "09_ru": "Сентябрь",
  "10_ru": "Октябрь",
  "11_ru": "Ноябрь",
  "12_ru": "Декабрь",
};

export default function NewsAbout({ setContentLoading }) {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [newsData, setNewData] = useState([]);
  const { t, i18n } = useTranslation();

  const lang = i18n.language;

  useEffect(() => {
    const fetchData = async () => {
      setContentLoading(true);
      try {
        const req = await axios.get("/news/news/" + id);
        const reqNews = await axios.get("/news/news/");
        setData(req.data);
        setNewData(reqNews.data.results);
        setContentLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div className={styles.content}>
          <div className={styles["news-title"]}>
            <div>
              <FaRegNewspaper />
              <p>{t("news")}</p>
            </div>
          </div>
          <h2>{data?.[`title_${lang}`]}</h2>
          <span>
            {data?.created_at?.slice(8, 10) +
              " " +
              month[data?.created_at?.slice(5, 7) + "_" + lang] +
              " " +
              data?.created_at?.slice(0, 4)}
          </span>
          <div className={styles.img}>
            <img src={data?.image} alt="im g" />
          </div>
          <ul
            dangerouslySetInnerHTML={{
              __html: data?.[`description_${lang}`],
            }}
          />
        </div>
      </div>
      <div className="container">
        <div className="img-cards">
          <h2>{t("latest_news")}</h2>
          <div className="cards">
            {newsData?.reverse()?.map((item, index) => {
              if (index < 3 && item?.id != id) {
                return <NewsCard item={item} key={item.id} />;
              }
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

NewsAbout.propTypes = {
  setContentLoading: Proptypes.func,
};
