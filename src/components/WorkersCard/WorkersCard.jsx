import PropTypes from "prop-types";
import styles from "./workerscard.module.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
export const WorkersCard = ({ item }) => {
  const { i18n } = useTranslation();
  const curLng = i18n.language;
  const { image } = item;
  
  return (
    <div className={styles.card}>
      <div className={styles["card-img"]}>
        <img src={image} alt="this is alt image" />
      </div>
      <div className={styles.content}>
        <h2>
          <Link to={"/news"}>{item[`name_${curLng}`]}</Link>
        </h2>
        <p className={styles.job}>
          <Link to={"/news"}>{item[`position_${curLng}`]}</Link>
        </p>
        <Link to={"/news"} className={styles.link}>
          <span>i</span>
        </Link>
      </div>
    </div>
  );
};

WorkersCard.propTypes = {
  item: PropTypes.object,
};
