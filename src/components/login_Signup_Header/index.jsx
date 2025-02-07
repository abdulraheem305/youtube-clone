import React from "react";
import { Link } from "react-router-dom";

const Header = ({ linkText, linkTo }) => {
  return (
    <header className="w-full p-4 bg-red-600 text-white flex justify-between items-center">
      <Link to="/" className="text-xl font-semibold">
        YouTube
      </Link>
      <Link
        to={linkTo}
        className="border border-white px-4 py-1.5 rounded-lg text-sm hover:bg-white hover:text-blue-600 transition"
      >
        {linkText}
      </Link>
    </header>
  );
};

export default Header;
