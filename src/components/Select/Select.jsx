import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "./select.module.css";

export const Select = ({ data }) => {
  const [value, setValue] = useState(data.value);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    onchangefunc(value);
  }, [value]);

  const liClickFunc = (value) => {
    setValue(value);
    setShowOptions(false);
  };

  const { onchangefunc, options, className } = data;
  return (
    <div className={styles[className]}>
      <p
        onClick={() => setShowOptions((prev) => !prev)}
        className={styles[showOptions ? "true" : "false"]}
      >
        <img
          src={options.filter((item) => item.value == value)[0].imgUrl}
          alt=""
        />{" "}
        <span>{options.filter((item) => item.value == value)[0].content}</span>
      </p>
      <ul className={`${showOptions ? "show" : "hidden"}`}>
        {options.map((item) => {
          return (
           item.value!=value&&
            <li
              key={item.id}
              onClick={() => {
                liClickFunc(item.value);
              }}
            >
              <img src={item.imgUrl} alt="" />
              {item.content}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Select.propTypes = {
  data: PropTypes.object,
};
