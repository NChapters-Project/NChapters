import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="shadow-md bg-slate-200">
      <div className="flex items-center justify-between max-w-6xl p-4 mx-auto ">
        <Link to="/">
          {/* Increased font size by adding 'text-lg' class */}
          <h1 className="flex flex-wrap text-xl font-bold cursor-pointer sm:text-2xl md:text-3xl">
            <span className="text-green-600">N</span>
            <span className="text-green-900">Chapters</span>
          </h1>
        </Link>
        {/* <Link to="/">
          <h1 className="flex flex-wrap font-bold cursor-pointer fletext-sm sm:text-lg ">
            <span className="text-green-600">N</span>
            <span className="text-green-900">Chapters</span>
          </h1>
        </Link> */}

        {/* <form className="flex items-center p-3 rounded-lg bg-slate-100">
          <input
            type="text"
            placeholder="Search..."
            className="w-24 bg-transparent focus:outline-none sm:w-64"
          />
          <FaSearch className="text-slate-500" />
        </form> */}

        <ul className="flex gap-4">
          <Link to="/create-listing">
            {/* Add text to the "List Your Event" button */}
            <li className="px-4 py-2 text-white bg-blue-500 rounded cursor-pointer sm:inline hover:text-blue-700">
              List Your Event
            </li>
          </Link>
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/contact">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Contact
            </li>
          </Link>
          <Link to="/Sign-in">
            <li className="sm:inline text-slate-700 hover:underline">
              Sign in
            </li>
          </Link>
          <Link to="/profile" className="flex items-center ">
            <i className="mr-2 text-xl fas fa-user-circle"></i>{" "}
          </Link>
        </ul>
      </div>
    </header>
  );
}
