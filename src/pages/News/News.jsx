import { useEffect, useState } from "react";
import styles from "./news.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { NewsCard } from "../../components/NewsCard/NewsCard";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

export const News = ({ setContentLoading }) => {
  const [newsData, setNewData] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      setContentLoading(true);
      try {
        const req = await axios.get("/news/news/");
        setNewData(req.data.results);
        setContentLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className={styles.section}>
      <div className="section-header">
        <div className="section-header_content">
          <h2>{t("navbar.news")}</h2>
          <p>
            <Link to={"/"}>{t("navbar.home")}</Link> {">"} {t("navbar.news")}
          </p>
        </div>
      </div>
      <div className="container">
        <div className={styles.cards}>
          {newsData.reverse().map((item, index) => {
            return index < 3 ? <NewsCard key={item.id} item={item} /> : "";
          })}
        </div>
      </div>
    </section>
  );
};

News.propTypes = {
  setContentLoading: PropTypes.func,
};
