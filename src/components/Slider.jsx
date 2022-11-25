import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import Img1 from "../assets/img1.png";
import Img2 from "../assets/img2.png";
import Img3 from "../assets/img3.png";
import withAutoplay from "react-awesome-slider/dist/autoplay";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Slider = () => {
  return (
    <AutoplaySlider
      cancelOnInteraction={false}
      interval={3000}
      play={true}
      bullets={false}
    >
      <div data-src={Img1} className="text-orange-400 relative h-full w-full">
        <span
          className="absolute bottom-[0rem] w-full h-[5rem] flex items-center text-gray-200 italic font-semibold justify-center text-2xl"
          style={{ backgroundColor: "rgba(128,128,128, 0.5)" }}
        >
          Join in and monitor live classes as if you are in the classroom!
        </span>
      </div>
      <div data-src={Img2} className="text-orange-400 relative h-full w-full">
        <span
          className="absolute bottom-[0rem] w-full h-[5rem] flex items-center text-gray-200 italic font-semibold justify-center text-2xl"
          style={{ backgroundColor: "rgba(128,128,128, 0.5)" }}
        >
          Monitor students’ performance after every exam!
        </span>
      </div>
      <div data-src={Img3} className="text-orange-400 relative h-full w-full">
        <span
          className="absolute bottom-[0rem] w-full h-[5rem] flex items-center text-gray-200 italic font-semibold justify-center text-2xl"
          style={{ backgroundColor: "rgba(128,128,128, 0.5)" }}
        >
          Easy access to digital content used by teachers and students!
        </span>
      </div>
    </AutoplaySlider>
  );
};

export default Slider;
