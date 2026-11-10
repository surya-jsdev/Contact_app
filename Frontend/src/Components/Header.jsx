import { Link } from "react-router-dom";

function Header({ Data }) {
  return (
    <header className="flex items-center justify-between bg-[#2861e8] px-[4%] py-[14px] text-white max-[480px]:gap-3 max-[480px]:px-[5%]">
      <Link to="/" className="text-inherit no-underline">
        <h2 className="text-xl">Contact Book</h2>
      </Link>
      <p className="rounded-full bg-white/20 px-[14px] py-[6px] text-[0.85rem] text-white">{Data.length} Contacts</p>
      <Link to="/add" className="rounded-[7px] border border-white/55 bg-[#0331c9] px-3 py-[7px] text-[0.85rem] font-semibold text-inherit no-underline">
        Add Contact
      </Link>
    </header>
  );
}

export default Header;
