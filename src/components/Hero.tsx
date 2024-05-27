import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Requires a loader
import First from "../assets/First.jpg";
import Second from "../assets/Second.jpg";
import Third from "../assets/Third.jpg";

function Hero() {
  return (
    <div className="relative w-full md:mb-0 mb-9 md:h-[600px]">
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        useKeyboardArrows
        autoPlay
        interval={3000}

      >
        <div className="h-[300px] md:h-[500px] object-cover">
          <img className='object-cover w-full h-full' src={First} alt="First Slide" />
        </div>
        <div className="h-[300px] md:h-[500px] object-cover">
          <img className='object-cover w-full h-full' src={Second} alt="Second Slide" />
        </div>
        <div className="h-[300px] md:h-[500px] object-cover">
          <img className='object-cover w-full h-full' src={Third} alt="Third Slide" />
        </div>
      </Carousel>
    </div>
  );
}

export default Hero;
