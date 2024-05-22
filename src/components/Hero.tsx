import spider from "../assets/spider.png";
import Logo from "../assets/Logo.svg"

function Hero() {
  return (
    <div className="flex md:flex-row-reverse px-6 md:px-0 flex-col-reverse md:pt-0 pt-[50px] md:pr-[8%] mb-[100px] justify-between items-center">
      <img className="w-[400px] md:w-[40%]" src={spider} alt="" />
      <div className="md:pl-[90px]">
        <img className="md:w-[25%] w-[100px] mb-10 md:mb-3" src={Logo} alt="" />
        <p className="text-5xl text-wrap md:text-6xl font-bold text-start">Explore and<br/> <span className=" text-red-700">Discover Amazing</span><br/> Movies Today</p>
      </div>
    </div>
  )
}

export default Hero
