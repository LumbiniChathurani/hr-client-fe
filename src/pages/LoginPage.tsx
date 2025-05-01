import React, { useState } from "react";
import image from "../assets/image.jpg";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface User {
  id: number;
  email: string;
  name: string;
  profile_image: string;
  role: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        toast.success("login success");
        console.log("Navigating as: ", data.body.userRole);
        navigate(handleRoute(data.body.userRole));
        console.log("Logged in user:", data);
      } else {
        setError(data.message);
        toast.error(data.message ?? "Login failed, check credentials");
        setSuccess("");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong");
      setSuccess("");
    }
  };

  return (
    <div>
      <section className="min-h-screen flex items-center justify-center font-mono bg-gradient-to-r from-purple-500 via-purple-800 to-purple-600">
        <div className="flex shadow-2xl">
          <div className="flex flex-col items-center justify-center text-center p-20 gap-8 bg-white rounded-2xl xl:rounded-tr-none xl:rounded-br-none">
            <h1 className="text-5xl font-bold text-slate-950">Welcome</h1>

            <div className="flex flex-col text-2xl text-left gap-1">
              <span className="text-slate-950 flex items-center gap-2">
                <MdEmail /> Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-md p-1 border-2 border-gray-300 bg-white text-black outline-none hover:border-purple-400 focus:border-purple-400"
              />
            </div>

            <div className="flex flex-col text-2xl text-left gap-1">
              <span className="text-slate-950 flex items-center gap-2">
                <FaLock /> Password
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md p-1 border-2 border-gray-300 bg-white text-black outline-none hover:border-purple-400 focus:border-purple-400"
              />
              <div className="flex gap-1 items-center">
                <input type="checkbox" className="bg-white" />
                <span className="text-slate-950 text-base">
                  Remember password
                </span>
              </div>
            </div>

            <button
              onClick={handleLogin}
              className="px-10 py-2 text-2xl rounded-md bg-gradient-to-tr from-purple-600 to-fuchsia-400 hover:from-pink-500 hover:to-fuchsia-600 text-white"
            >
              Login
            </button>

            {error && <p className="text-red-500 font-medium">{error}</p>}
            {success && <p className="text-green-500 font-medium">{success}</p>}

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
            className="w-[450px] h-[600px] object-cover xl:rounded-tr-2xl xl:rounded-br-2xl xl:block hidden"
          />
        </div>
      </section>
    </div>
  );
}

function handleRoute(userRole: String): string {
  switch (userRole) {
    case "ADMIN":
      return "/dashboard";
    case "REQRUITER":
      return "/";
    case "USER":
      return "/";
    case "HRM":
      return "/dashboard";
    case "EMPLOYEE":
      return "/dashboard";
    default:
      return "/";
  }
}
