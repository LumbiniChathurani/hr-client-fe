import React, { useState } from "react";
import image from "../assets/image.jpg";
import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { SERVER } from "../constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type UserType = {
  email: string;
  userName: string;
  password: string;
  repassword: string;
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<Partial<UserType>>({
    email: "",
    password: "",
    repassword: "",
    userName: "",
  });

  const handleSubmit = async () => {
    console.log(user);
    user.repassword = undefined;
    const response = await fetch(`${SERVER}/api/register`, {
      method: "POSt",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const body = await response.json();
      toast.error(body.message ?? "Failed user creation");
    } else {
      toast.success("user created");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setUser((u) => {
      u[name as keyof UserType] = value;
      return { ...u };
    });
  };

  return (
    <div>
      <section
        className="min-h-screen flex items-center justify-center font-mono bg-gradient-to-r from-purple-500 from-10%
      via-purple-800 via-50% to-purple-600 to-100%"
      >
        <div className="flex shadow-2xl mt-12 mb-12">
          <div
            className="flex flex-col items-center justify-center text-center p-20 gap-8 bg-white rounded-2xl
          xl:rounded-tr-none xl:rounded-br-none"
          >
            <h1 className="text-5xl font-bold text-slate-950">Register</h1>
            <div className="w-full flex flex-col text-2xl text-left gap-1">
              <span className="text-slate-950 flex items-center gap-2">
                <FaUser /> Name
              </span>
              <input
                type="text"
                name="userName"
                value={user.userName}
                onChange={handleChange}
                className="w-full rounded-md p-1 border-2 border-gray-300 bg-white text-black outline-none hover:border-purple-400 focus:border-purple-400"
              />
            </div>
            <div className="w-full flex flex-col text-2xl text-left gap-1">
              <span className="text-slate-950 flex items-center gap-2">
                <MdEmail /> Email
              </span>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full rounded-md p-1 border-2 border-gray-300 bg-white text-black outline-none hover:border-purple-400 focus:border-purple-400"
              />
            </div>
            <div className="w-full flex flex-col text-2xl text-left gap-1">
              <span className="text-slate-950 flex items-center gap-2">
                <FaLock /> Password
              </span>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="w-full rounded-md p-1 border-2 border-gray-300 bg-white text-black outline-none hover:border-purple-400 focus:border-purple-400"
              />
            </div>
            <div className="w-full flex flex-col text-2xl text-left gap-1">
              <span className="text-slate-950 flex items-center gap-2">
                <FaLock /> Confirm Password
              </span>
              <input
                type="password"
                name="repassword"
                value={user.repassword}
                onChange={handleChange}
                className="w-full rounded-md p-1 border-2 border-gray-300 bg-white text-black outline-none hover:border-purple-400 focus:border-purple-400"
              />
            </div>
            <button
              onClick={() => {
                handleSubmit();
              }}
              className="px-10 py-2 text-2xl rounded-md bg-gradient-to-tr from-purple-600 to-fuchsia-400 hover:from-pink-500 hover:to-fuchsia-600 text-white"
            >
              Register
            </button>
          </div>
          <img
            src={image}
            alt=""
            className="w-[450px] h-[850px] object-cover xl:rounded-tr-2xl xl:rounded-br-2xl xl:block hidden"
          />
        </div>
      </section>
    </div>
  );
}
