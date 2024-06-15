import PropTypes from "prop-types";
import styles from "./newscard.module.css";
import { useTranslation } from "react-i18next";
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
        <h2>{item[`title_${curLng}`]}</h2>
        <p>{item[`description_${curLng}`]}</p>
        <span>
          {created_at.slice(0, 10)} {created_at.slice(11, 19)}
        </span>
      </div>
    </div>
  );
};

NewsCard.propTypes = {
  item: PropTypes.object,
};
