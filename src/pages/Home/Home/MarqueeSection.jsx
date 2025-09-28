import Marquee from "react-fast-marquee";
// import MyComponents from "./MyComponents";

import img1 from "../../../assets/brands/amazon.png"
 import img2 from "../../../assets/brands/amazon_vector.png"
import img3 from "../../../assets/brands/casio.png"
import img4 from "../../../assets/brands/moonstar.png"
import img5 from "../../../assets/brands/randstad.png"
import img6 from "../../../assets/brands/start.png"

const MarqueeSection = () => {
  return (
    <>
<Marquee className="bg-linear-to-r from-cyan-500 to-blue-500 p-6">
        <div className="flex gap-14 p-4">
          <div>
          <img src={img1} alt="" srcset="" />
        </div>
        <div>
          <img src={img2} alt="" srcset="" />
        </div>
        <div>
          <img src={img3} alt="" srcset="" />
        </div>
        <div>
          <img src={img4} alt="" srcset="" />
        </div>
        <div>
          <img src={img5} alt="" srcset="" />
        </div>
        <div>
          <img src={img6} alt="" srcset="" />
        </div>
        </div>
    </Marquee>
    </>
    
  )
}

export default MarqueeSection
