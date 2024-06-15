import PropTypes from "prop-types";
import { FaCarRear, FaRoad } from "react-icons/fa6";
import { IoPricetags } from "react-icons/io5";

import styles from "./carcard.module.css";
import { useTranslation } from "react-i18next";
export const CarCard = ({ item }) => {
  const { image, price, year, km } = item;
  const { i18n } = useTranslation();
  const curLng = i18n.language;
  return (
    <div className={styles.card}>
      <div className={styles["card-img"]}>
        <img src={image} alt="car img" />
      </div>
      <div className={styles.static}>
        <p>
          <FaCarRear /> {year} y
        </p>
        <p>
          <FaRoad /> {km} km
        </p>
        <p>
          <IoPricetags /> {price}
        </p>
      </div>
      <h2>{item[`title_${curLng}`]}</h2>
      <p>{item[`description_${curLng}`]}</p>
    </div>
  );
};

CarCard.propTypes = {
  item: PropTypes.object,
};
