import spider from "../assets/spider.png";
import Logo from "../assets/Logo.svg"

function Hero() {
  return (
    <div className="flex md:flex-row-reverse flex-col-reverse pr-[8%] mb-[100px] justify-between items-center">
      <img className="w-[40%]" src={spider} alt="" />
      <div className="pl-[90px]">
        <img className="md:w-[25%] mb-3" src={Logo} alt="" />
        <p className="text-6xl font-bold">Explore and<br/> <span className=" text-red-700">Discover Amazing</span><br/> Movies Today</p>
      </div>
    </div>
  )
}

export default Hero
