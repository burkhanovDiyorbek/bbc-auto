import { useEffect, useState } from "react";
import styles from "./catalog.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { CarCard } from "../../components/CarCard/CarCard";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Catalog = () => {
  const [catalog, setCatalog] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqCatalog = await axios.get(
          "/catalog/car/"
        );
        setCatalog(reqCatalog.data.results);
      } catch (error) {
        toast.error(error.message, { position: "top-center" });
      }
    };
    fetchData();
  }, []);
  return (
    <section className={styles.section}>
      <div className="section-header">
        <h2>{t("navbar.catalog")}</h2>
        <p>
          <Link to={"/"}>{t("navbar.home")}</Link> {">"} {t("navbar.catalog")}
        </p>
      </div>
      <div className="container">
        <div className={styles.sort}>   
        </div>
        <div className="cards">
          {catalog.map(
            (item, index) => index < 8 && <CarCard key={item.id} item={item} />
          )}
        </div>
      </div>
    </section>
  );
};
