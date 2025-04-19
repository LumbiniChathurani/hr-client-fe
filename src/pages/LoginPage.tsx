import React from "react";
import image from "../assets/image.jpg";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function LoginPage() {
  return (
    <div>
      <section
        className="min-h-screen flex items-center justify-center font-mono bg-gradient-to-r from-purple-500 from-10%
      via-purple-800 via-50% to-purple-600 to-100%"
      >
        <div className="flex shadow-2xl">
          <div
            className="flex flex-col items-center justify-center text-center p-20 gap-8 bg-white rounded-2xl
          
          xl:rounded-tr-none xl:rounded-br-none
          "
          >
            <h1 className="text-5xl font-bold text-slate-950">Welcome</h1>
            <div className="flex flex-col text-2xl text-left gap-1">
              <span className="text-slate-950 flex items-center gap-2">
                <MdEmail />
                Email
              </span>
              <input
                type="text"
                className="rounded-md p-1 border-2 border-gray-300 bg-white text-black outline-none hover:border-purple-400 focus:border-purple-400"
              />
            </div>
            <div className="flex flex-col text-2xl text-left gap-1">
              <span className="text-slate-950 flex items-center gap-2">
                <FaLock />
                Password
              </span>
              <input
                type="password"
                className="rounded-md p-1 border-2 border-gray-300 bg-white text-black outline-none hover:border-purple-400 focus:border-purple-400"
              />
              <div className="flex gap-1 items-center">
                <input type="checkbox" className="bg-white" />
                <span className="text-slate-950 text-base ">
                  Remember password
                </span>
              </div>
            </div>
            <button
              className="
            px-10 py-2 text-2xl rounded-md bg-gradient-to-tr from-purple-600 to-fuchsia-400 hover:from-pink-500 hover:to-fuchsia-600 text-white
            "
            >
              Login
            </button>
            <p className="font-semibold text-black">
              Don't have an account?{" "}
              <Link to="/register" className="text-violet-600 hover:underline">
                Register
              </Link>
            </p>
          </div>
          <img
            src={image}
            alt=""
            className="w-[450px] h-[600px] object-cover xl:rounded-tr-2xl
          xl:rounded-br-2xl
          xl:block hidden"
          />
        </div>
      </section>
    </div>
  );
}
