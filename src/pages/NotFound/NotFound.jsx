import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import styles from "./notfound.module.css";
export const NotFound = () => {
  return (
    <div className={styles.container + " container"}>
      <div>
        <h1>404</h1>
      </div>
      <div>
        <h2>Ooops, This Page Could Not Be Found!</h2>
        <p>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link to={'/'}>
          <Button content={"Back to home page"} classname="register" />
        </Link>
      </div>
      <p></p>
    </div>
  );
};
