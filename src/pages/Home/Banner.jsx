import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import img1 from '../../assets/banner/banner1.png'
import img2 from '../../assets/banner/banner2.png'
import img3 from '../../assets/banner/banner3.png'

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,      // infinite loop
    autoplay: true,      // autoplay enabled
    autoplaySpeed: 3000, // 3 seconds
    speed: 400,          // transition speed
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="w-full h-[500px] top-0 relative">
      <Slider {...settings} className="h-[500px]">
        <div>
          <img
            src={img1}
            alt="Banner 1"
            className="w-full h-[500px] object-cover"
          />
        </div>
        <div>
          <img
            src={img2}
            alt="Banner 2"
            className="w-full h-[500px] object-cover"
          />
        </div>
        <div>
          <img
            src={img3}
            alt="Banner 3"
            className="w-full h-[500px] object-cover"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
