import PropTypes from "prop-types";
import styles from "./newscard.module.css";
export const NewsCard = ({ item }) => {
  const { image, title, description, created_at } = item;
  console.log(item);
  return (
    <div className={styles.card}>
      <div className={styles["card-img"]}>
        <img src={image} alt="this is alt image" />
      </div>
      <div className={styles.content}>
        <h2>{title}</h2>
        <p>{description}</p>
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
