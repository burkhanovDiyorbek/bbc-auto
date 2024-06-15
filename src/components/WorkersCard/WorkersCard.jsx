import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import styles from "./workerscard.module.css";
import { Link } from "react-router-dom";

export const WorkersCard = ({ item }) => {
  const { i18n } = useTranslation();
  const curLng = i18n.language;

  return (
    <div className={styles.card}>
      <div className={styles["card-img"]}>
        <img src={item.image} alt="worker img" />
      </div>
      <div className={styles.content}>
        <h2>{item[`name_${curLng}`]}</h2>
        <p>{item[`position_${curLng}`]}</p>
      </div>
      <div className={styles.socials}>
        {item.socials.map((item) => {
          const { id, social_name, link } = item;
          return (
            <Link key={id} to={link}>
             <p>{social_name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

WorkersCard.propTypes = {
  item: PropTypes.object,
};
