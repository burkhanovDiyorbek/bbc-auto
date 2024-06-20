import { useState } from "react";
import styles from "./time.module.css";

export const Time = () => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  setInterval(() => {
    const date = new Date();
    setHour(date.getHours());
    setMinute(date.getMinutes());
    setSecond(date.getSeconds());
  }, 1000);

  return (
    <div className={styles.div + " mob-hide"}>
      <p>{hour < 10 ? "0" + hour : hour}</p>
      <span>:</span>
      <p>{minute < 10 ? "0" + minute : minute}</p>
      <span>:</span>
      <p>{second < 10 ? "0" + second : second}</p>
    </div>
  );
};
