"use client";
import { useState } from "react";
import Login from "../components/Auth/login";
import Register from "../components/Auth/register";

const LoginPage = () => {
  const [select, setSelect] = useState("login");

  return (
    <div className="flex flex-col justify-center items-center w-full h-full md:h-screen">
      <div className=" w-5/6 md:w-4/6 max-w-2xl bg-slate-200 rounded-3xl shadow-2xl shadow-zinc-600 mt-5">
        <div className="px-3 md:px-10 py-16">
          {select === "login" ? <Login /> : <Register />}

          <div className="mt-4">
            {select === "login" && (
              <p>
                Don&apos;t have an account?{" "}
                <span
                  onClick={() => setSelect("register")}
                  className="underline cursor-pointer"
                >
                  Register
                </span>
              </p>
            )}
            {select === "register" && (
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => setSelect("login")}
                  className="underline cursor-pointer"
                >
                  Login
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
