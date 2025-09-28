import Slider from "react-slick";

import { FaRegCommentDots } from "react-icons/fa"; // logo from react-icons
import reviewsData from "../../../assets/reviews.json"
const ReviewsSection = () => {
  const settings = {
    dots: true, // pagination dots
    infinite: true,
    speed: 500,
    slidesToShow: 2, // show 2 reviews at a time
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-full mx-auto px-4 py-10">
 

      <Slider {...settings}>
        {reviewsData.map((review) => (
          <div key={review.id} className="p-4">
            <div className="bg-[#33929D] shadow-md rounded-xl p-5 border border-gray-200 h-full">
              {/* Logo (React Icon) */}
              <div className="flex items-center mb-3 text-[#CAEB66]">
                <FaRegCommentDots size={28} />
              </div>

              {/* Review text */}
              <p className="text-amber-200 font-bold mb-4">{review.review}</p>

              {/* Dotted line */}
              <hr className="border-t-2 border-dotted text-[#CAEB66] my-4" />

              {/* User info */}
              <div className="flex items-center space-x-3">
                <img
                  src={review.user_photoURL}
                  alt={review.userName}
                  className="w-12 h-12 rounded-full border"
                />
                <div>
                  <p className="font-semibold text-[#CAEB66]">{review.userName}</p>
                  <p className="text-sm text-[#CAEB66]">{review.user_email}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};



export default ReviewsSection
