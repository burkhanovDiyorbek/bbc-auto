import { useEffect, useState } from "react";
import styles from "./catalog.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { CarCard } from "../../components/CarCard/CarCard";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation, A11y } from "swiper/modules";
import PropTypes from "prop-types";
import "swiper/css";
import "swiper/css/bundle";
import ReactPaginate from "react-paginate";

export const Catalog = ({ setContentLoading }) => {
  const [catalog, setCatalog] = useState([]);
  const [search, setSearch] = useState("");
  const [discount, setDiscount] = useState(false);
  const [selectVal, setSelectVal] = useState("all");
  const { t, i18n } = useTranslation();
  const [sliders, setSliders] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    perPage: 10,
    total: 0,
  });
  const curLng = i18n.language;

  useEffect(() => {
    const fetchData = async (page = 1) => {
      setContentLoading(true);
      try {
        const reqCatalog = await axios.get(`/catalog/car/?page=${page}`);
        const reqLogos = await axios.get("/catalog/logo/");
        setCatalog(reqCatalog.data.results);
        setSliders(reqLogos.data.results);
        setPagination(reqCatalog.data.pagination);
        setContentLoading(false);
      } catch (error) {
        toast.error(error.message, { position: "top-center" });
      }
    };
    fetchData(pagination.currentPage);
  }, [pagination.currentPage]);

  const handlePageClick = (event) => {
    const newPage = event.selected + 1;
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
  };

  return (
    <section className={styles.section + " catalog-section"}>
      <div className="section-header">
        <div className="section-header_content">
          <h2>{t("navbar.catalog")}</h2>
          <p>
            <Link to={"/"}>{t("navbar.home")}</Link> {">"} {t("navbar.catalog")}
          </p>
        </div>
      </div>

      {/* Slider Section */}
      <div className={styles.slider}>
        <h2 style={{ textAlign: "center" }}>{t(`catalog.partners`)}</h2>
        <Swiper
          modules={[Autoplay, Navigation, A11y]}
          spaceBetween={50}
          slidesPerView={5}
          navigation
          loop={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
        >
          {sliders.map((item) => (
            <SwiperSlide key={item.id}>
              <Link to={item.link} target="_blank">
                <div className="swiper-slide">
                  <img src={item.image} alt="img" />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Sort & Search Section */}
      <div className={styles.sort}>
        <div>
          <input
            type="checkbox"
            id="dicount_true"
            onChange={(e) => setDiscount(e.target.checked)}
          />
          <label htmlFor="dicount_true">{t("catalog.discount_true")}</label>
        </div>
        <div>
          <label className={styles.label}>
            <input
              type="text"
              placeholder={t("navbar.input_placeholder")}
              onInput={(e) => setSearch(e.target.value)}
            />
            <FaSearch />
          </label>
        </div>
        <div>
          <select onChange={(e) => setSelectVal(e.target.value)}>
            <option value={"all"}>{t("catalog.sort_all_type")}</option>
            <option value="mechanic">{t("catalog.mechanic")}</option>
            <option value="automatic">{t("catalog.automatic")}</option>
          </select>
        </div>
      </div>

      {/* Catalog Cards Section */}
      <div className="container">
        <div className="cards">
          {catalog
            .filter((item) =>
              item[`title_${curLng}`]
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .filter((item) => (discount ? item.discount : item))
            .filter((item) => (selectVal !== "all" ? item[selectVal] : item))
            .map((item) => (
              <CarCard key={item.id} item={item} />
            ))}
        </div>

        {/* Pagination Component */}
      </div>
      <div className="container">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pagination.lastPage}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          forcePage={pagination.currentPage - 1}
          className="paginate"
        />
      </div>
    </section>
  );
};

Catalog.propTypes = {
  setContentLoading: PropTypes.func,
};
