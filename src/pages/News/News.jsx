import { useEffect, useState } from "react";
import styles from "./news.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { NewsCard } from "../../components/NewsCard/NewsCard";
import { useTranslation } from "react-i18next";

export const News = () => {
  const [newsData, setNewData] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await axios.get("http://bbc.mebel-zakaz.uz/news/news/");
        setNewData(req.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className={styles.section}>
      <div className="section-header">
        <h2>{t("navbar.news")}</h2>
        <p>
          <Link to={"/"}>{t("navbar.home")}</Link> {">"} {t("navbar.news")}
        </p>
      </div>
      <div className="container">
        <div className="cards">
          {newsData.map((item) => {
            return <NewsCard key={item.id} item={item} />;
          })}
        </div>
      </div>
    </section>
  );
};
