import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center pt-[10vh]">
      <p className="font-bold text-[5rem] leading-[5rem]">404</p>
      <p className="text-[1.4rem]">Page not Found</p>
      <p>
        <Link to="/">
          <button
            className="bg-[#000] text-[#FFF] px-[1.5rem] py-[0.6rem] mt-3 text-[1.2rem] rounded font-semibold"
          >
            Back to Home
          </button>
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
