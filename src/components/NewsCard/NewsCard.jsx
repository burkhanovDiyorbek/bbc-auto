import PropTypes from "prop-types";
import styles from "./newscard.module.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
export const NewsCard = ({ item }) => {
  const { i18n } = useTranslation();
  const curLng = i18n.language;
  const { image, created_at } = item;
  return (
    <div className={styles.card}>
      <div className={styles["card-img"]}>
        <img src={image} alt="this is alt image" />
      </div>
      <div className={styles.content}>
        <h2>
          <Link to={"/news"}>{item[`title_${curLng}`]}</Link>
        </h2>
        <Link to={"/news"} className={styles.link}>
          <span>
            {created_at.slice(8, 10)}.{created_at.slice(5, 7)}
          </span>
        </Link>
      </div>
    </div>
  );
};

NewsCard.propTypes = {
  item: PropTypes.object,
};
