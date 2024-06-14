import styles from "./button.module.css";
import PropTypes from "prop-types";

export const Button = ({ classname = "button", content, clickFunc=null }) => {
  return (
    <button className={styles[classname]} onClick={clickFunc}>
      {content}
    </button>
  );
};

Button.propTypes = {
  classname: PropTypes.string,
  content: PropTypes.string,
  clickFunc: PropTypes.func,
};
