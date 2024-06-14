import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/bundle";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const Home = () => {
  const [sliders, setSliders] = useState([]);
  console.log(sliders);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await axios.get("http://bbc.mebel-zakaz.uz/slider/slider/");
        setSliders(req.data.results);
      } catch (error) {
        toast.error(error.message, { position: "top-center" });
      }
    };
    fetchData();
  }, []);
  return (
    <Swiper
      modules={[Autoplay, Navigation, A11y]}
      spaceBetween={500}
      slidesPerView={1}
      navigation
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      <SwiperSlide>
        <div className="swiper-slide">
          <img src={sliders[0]?.image} alt="img" />
          <h2>{sliders[0]?.title}</h2>
          <p>{sliders[0]?.description}</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-slide">
          <img src={sliders[1]?.image} alt="img" />
          <h2>{sliders[1]?.title}</h2>
          <p>{sliders[1]?.description}</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-slide">
          <img src={sliders[2]?.image} alt="img" />
          <h2>{sliders[2]?.title}</h2>
          <p>{sliders[2]?.description}</p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};
