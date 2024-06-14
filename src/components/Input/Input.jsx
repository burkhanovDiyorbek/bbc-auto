import styles from "./input.module.css";
import PropTypes from "prop-types";
export const Input = ({
  placeholder,
  changeFunc = null,
  classname = "input",
  type='text'
}) => {
  return (
    <input
      className={styles[classname]}
      placeholder={placeholder}
      onInput={changeFunc}
      type={type}
    />
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  changeFunc: PropTypes.func,
  classname: PropTypes.string,
  type: PropTypes.string,
};
