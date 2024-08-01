import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeSlider = () => {
  const settings = {
    infinite: true,
    fade: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    arrows: false,
  };

  return (
    <Slider {...settings} className="py-20">
      <div className="bg-slider h-[600px] !flex !flex-col !items-center !justify-center space-y-10 rounded-3xl">
        <h2 className="text-3xl md:text-6xl text-white font-semibold">
          ZYNORO Ecosystem
        </h2>
        <p className="text-lg md:text-2xl text-white font-medium px-20 text-center">
          Zynoro token is used as key currency for the recently launched QuantFi
          service. Used for single and pair deposits. It also correlates closely
          sith the Zynoro Governance of the Zynoro Ecosystem to achieve
          ecosystem expansion.
        </p>
      </div>

      <div className="bg-slider h-[600px] !flex !flex-col !items-center !justify-center space-y-10 rounded-3xl">
        <h2 className="text-3xl md:text-6xl text-white font-semibold">
          ZYNORO Solution
        </h2>
        <p className="text-lg md:text-2xl text-white font-medium px-20 text-center">
          By developing quant algorithms (information, technical limitations,
          user convenience, etc.) to solve the disproportionate environmental
          problems of retail investors relative to corporate capital, we want to
          provide solutions that enable retail investors to pursue stable
          returns.
        </p>
      </div>

      <div className="bg-slider h-[600px] !flex !flex-col !items-center !justify-center space-y-10 rounded-3xl">
        <h2 className="text-3xl md:text-6xl text-white font-semibold">
          ZYNORO Mission
        </h2>
        <p className="text-lg md:text-2xl text-white font-medium px-20 text-center">
          It aims to become a community-based algorithm investment data
          marketplace according to the trend of the blockchain industry.
        </p>
      </div>
    </Slider>
  );
};

export default HomeSlider;
