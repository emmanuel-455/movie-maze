import { useEffect, useState } from "react";
import Instagram from "../assets/instagram.svg"
import Twitter from "../assets/twitter.svg"
import Logo from "../assets/Logo.svg"

function Footer() {
  const [date, setDate] = useState<number | null>(null);

  useEffect(() => {
    setDate(new Date().getFullYear());
  }, []);

  return (
    <footer className="py-4 px-3 flex justify-between items-center gap-2 flex-wrap bg-[#161921]">
      <div>
        <p className="text-sm font-medium text-white">@{date} EpicAnimeView</p>
        <p className="text-xs font-medium mt-1">Ngene Arinze</p>
      </div>
      <img
        src={Logo}
        alt="logo"
        width={47}
        height={44}
        className="object-contain"
      />
      <div className="flex items-center gap-6">
        <a href="https://www.instagram.com/arinzee_chukwu/" target="_blank">
        <img
          src={Instagram}
          alt="logo"
          width={19}
          height={19}
          className="object-contain"
        />
        </a>
        <a href="https://twitter.com/priestnuel4" target="_blank">
        <img
          src={Twitter}
          alt="logo"
          width={19}
          height={19}
          className="object-contain"
        />
       </a>
      </div>
    </footer>
  );
}

export default Footer;
