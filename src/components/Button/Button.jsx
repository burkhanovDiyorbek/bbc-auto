import styles from "./button.module.css";
import PropTypes from "prop-types";

export const Button = ({
  classname = "button",
  content,
  clickFunc = null,
  isLoading = false,
}) => {
  return (
    <button
      className={
        !isLoading
          ? styles[classname]
          : styles[classname] + " "  + styles.disabled
      }
      onClick={clickFunc}
      disabled={isLoading}
    >
      {!isLoading ? content : "Loading..."}
    </button>
  );
};

Button.propTypes = {
  classname: PropTypes.string,
  content: PropTypes.string,
  clickFunc: PropTypes.func,
  isLoading: PropTypes.bool,
};
