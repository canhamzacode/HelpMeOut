import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Auth = () => {
  return (
    <div className="w-full py-6 px-5 md:px-20 sm:px-10 grid gap-4">
      <div className="flex items-center justify-center">
        <Link to="/">
          <img src={logo} alt="Help Me Out Logo" />
        </Link>
      </div>
      <div className="w-full grid gap-8 max-w-[650px] mx-auto py-2">
        <div className="grid gap-2 text-center">
          <h1 className="font-bold text-3xl text-text-primary text-center">
            Log in or Sign up
          </h1>
          <p className="text-grey">
            Join millions of others in sharing successful moves on HelpMeOut.
          </p>
        </div>
        <div className="grid gap-3">
          <button className="w-full flex gap-3 items-center justify-center p-2 rounded-xl border bg-white border-black">
            <FcGoogle size={30} />
            <p className="font-medium"> Continue with Google</p>
          </button>
          <button className="w-full flex gap-3 items-center justify-center p-2 rounded-xl border bg-white border-black">
            <FaFacebook size={30} color="#1877F2" />
            <p className="font-medium"> Continue with Facebook</p>
          </button>
        </div>
        <div className="w-full flex items-center justify-center">
          <hr className="w-full" />
        </div>
        <form className="w-full grid gap-[15px]">
          <div className="w-full grid gap-[10px]">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              placeholder="e.g user@gmail.com"
              className=" p-[10px] border-[#E8E8E8] border rounded-md"
            />
          </div>
          <div className="w-full grid gap-[10px]">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className=" p-[10px] border-[#E8E8E8] border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="px-[30px] py-[15px] rounded-md border border-black w-full font-bold bg-[#120B48] text-white"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
