import { useTranslation } from "react-i18next";
import styles from "./servicescard.module.css";
import PropTypes from "prop-types";
import { TfiArrowTopRight } from "react-icons/tfi";

export const Services = ({ item }) => {
  const { i18n } = useTranslation();
  const curLng = i18n.language;
  return (
    <div className={styles.card}>
      <div>
        <h2>{item[`title_${curLng}`]}</h2>
        <p>{item[`description_${curLng}`]}</p>
      </div>
      <div className={styles.bottom}>
        <p>
          <span>
            <TfiArrowTopRight/>
          </span>
        </p>
      </div>
    </div>
  );
};
Services.propTypes = {
  item: PropTypes.object,
};
