import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import styles from "./notfound.module.css";
import { useTranslation } from "react-i18next";
export const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.container + " container"}>
      <div>
        <h1>404</h1>
      </div>
      <div>
        <h2>{t("404.title")}</h2>
        <p>{t("404.desc")}</p>
        <Link to={"/"}>
          <Button content={t("404.btn_content")} classname="register" />
        </Link>
      </div>
      <p></p>
    </div>
  );
};
