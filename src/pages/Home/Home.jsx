import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, A11y, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./home.module.css";
import { NewsCard } from "../../components/NewsCard/NewsCard";
import { useTranslation } from "react-i18next";
import { CarCard } from "../../components/CarCard/CarCard";
import PropTypes from "prop-types";
import { Button } from "../../components/Button/Button";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/pagination";

export const Home = ({ setContentLoading }) => {
  const [sliders, setSliders] = useState([]);
  const [newsData, setNewData] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const { t, i18n } = useTranslation();
  const curLng = i18n.language;

  useEffect(() => {
    const fetchData = async () => {
      setContentLoading(true);
      try {
        const req = await axios.get("/slider/slider/");
        const reqNews = await axios.get("/news/news/");
        const reqDiscount = await axios.get("/catalog/car");
        setSliders(req.data.results);
        setNewData(reqNews.data.results);
        setDiscountData(
          reqDiscount.data.results.filter((item) => item.discount)
        );
        setContentLoading(false);
      } catch (error) {
        toast.error(error.message, { position: "top-center" });
      }
    };
    fetchData();
  }, []);

  return (
    <section className={styles["home-section"]}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination, A11y]}
        spaceBetween={500}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 3000,
        }}
      >
        <SwiperSlide>
          <div className="swiper-slide">
            <img src={sliders[0]?.image} alt="img" />
            <div className={styles.content}>
              <h2>{sliders[0]?.[`title_${curLng}`]}</h2>
              <p>{sliders[0]?.[`description_${curLng}`]}</p>
              <Link to={"/catalog"}>
                <Button content={t("navbar.catalog")} classname="home" />
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-slide">
            <img src={sliders[1]?.image} alt="img" />
            <div className={styles.content}>
              <h2>{sliders[1]?.[`title_${curLng}`]}</h2>
              <p>{sliders[1]?.[`description_${curLng}`]}</p>
              <Link to={"/catalog"}>
                <Button content={t("navbar.catalog")} classname="home" />
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-slide">
            <img src={sliders[2]?.image} alt="img" />
            <div className={styles.content}>
              <h2>{sliders[2]?.[`title_${curLng}`]}</h2>
              <p>{sliders[2]?.[`description_${curLng}`]}</p>
              <Link to={"/catalog"}>
                <Button content={t("navbar.catalog")} classname="home" />
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="container" style={{ flexDirection: "column" }}>
        <div className={styles.slice}>
          <h2>{t("navbar.discount")}</h2>
          <div className="cards">
            {discountData.reverse().map((item, index) => {
              return index < 4 && <CarCard item={item} key={item.id} />;
            })}
          </div>
        </div>
        <div className={styles.slice}>
          <h2>{t("navbar.news")}</h2>
          <div className={styles["news-cards"]}>
            {newsData.reverse().map((item, index) => {
              return index < 4 && <NewsCard key={item.id} item={item} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

Home.propTypes = {
  setContentLoading: PropTypes.func,
};
