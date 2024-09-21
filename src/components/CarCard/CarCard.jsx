import PropTypes from "prop-types";
import { FaCarRear, FaRoad } from "react-icons/fa6";
import { IoPricetags } from "react-icons/io5";

import styles from "./carcard.module.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";

export const CarCard = ({ item }) => {
  const { price, year, km } = item;
  const { i18n } = useTranslation();
  const curLng = i18n.language;

  return (
    <div className={styles.card} key={item.id}>
      <div className={styles["card-img"]}>
        <img src={item?.image} alt="car img" />
      </div>
      <div className={styles.content}>
        <div className={styles["content-text"]}>
          <Link to={`/catalog/car/${item.id}/`}>
            <h2>{item[`title_${curLng}`]}</h2>
          </Link>
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
        </div>
        <div className={styles["content-details"]}>
          <Link to={`/catalog/car/${item.id}/`}>
            <Button content={"Details"} classname="car-btn" />
          </Link>
          <p>
            <span>{item.price}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

CarCard.propTypes = {
  item: PropTypes.object,
};
