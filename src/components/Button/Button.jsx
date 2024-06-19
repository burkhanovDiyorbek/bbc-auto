import styles from "./button.module.css";
import PropTypes from "prop-types";

export const Button = ({
  classname = "button",
  content,
  clickFunc = null,
  isLoading = false,
  isEmpty = false,
}) => {
  return (
    <button
      className={
        !isLoading || !isEmpty
          ? styles[classname]
          : styles[classname] + " " + styles.disabled
      }
      onClick={clickFunc}
      disabled={isLoading || isEmpty}
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
  isEmpty: PropTypes.bool,
};
