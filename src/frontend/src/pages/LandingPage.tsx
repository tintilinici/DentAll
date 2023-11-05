import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-white h-full">
      <div className="flex justify-between py-8 px-12 items-center">
        <ul className="flex space-x-12 text-cyan-500">
          <Link to="/">Home</Link>
          <Link to="/">About</Link>
          <Link to="/">Contact</Link>
        </ul>
        <Link
          to="/login"
          className="bg-orange-500 text-white py-2 px-8 hover:bg-orange-600 hover:shadow-md"
        >
          Prijavi se
        </Link>
      </div>
      <h1 className="text-center text-9xl italic pt-28 text-cyan-500">
        DentAll
      </h1>
    </div>
  );
};

export default LandingPage;
