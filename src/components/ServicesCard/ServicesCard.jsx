import { useTranslation } from "react-i18next";
import styles from "./servicescard.module.css";
import PropTypes from "prop-types";
export const Services = ({ item }) => {
  const { i18n } = useTranslation();
  const curLng = i18n.language;
  return (
    <div className={styles.card}>
      <img src={item.svg_icon} alt={"services svg"} />
      <h2>{item[`title_${curLng}`]}</h2>
      <p>{item[`description_${curLng}`]}</p>
    </div>
  );
};
Services.propTypes = {
  item: PropTypes.object,
};
