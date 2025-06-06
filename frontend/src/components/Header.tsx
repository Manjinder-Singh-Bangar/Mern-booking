import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-blue-800 py-6">
      <div className="container flex justify-between mx-auto">
        <span className="text-3xl text-white font-bold flex tracking-tight">
          <Link to="/">MernHolidays.com</Link>
        </span>
        <span className="flex space-x-2">
          <Link
            to="/sign-in"
            className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
          >
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Header;
