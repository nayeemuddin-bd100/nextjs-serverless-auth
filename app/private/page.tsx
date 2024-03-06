import { redirect } from "next/navigation";
import getUser from "../lib/getUser";

const PrivatePage = () => {
  const { token, userData } = getUser();

  if (!token || !userData) {
    redirect("/login");
  } else {
    console.log("JWT token:", token);
    console.log("User data:", userData);
  }

  return (
    <div className="w-full sm:w-[80%] mx-auto flex justify-center items-center h-screen flex-wrap text-2xl md:text-5xl text-center text-indigo-900 px-15 md:px-32 sm:text-3xl ">
      Welcome to the private page .This page is private, only accessible for
      logged-in users.exclusive content awaits for you! If you&apos;re here, it
      means you&apos;ve logged in successfully. Welcome! 🥳
    </div>
  );
};

export default PrivatePage;
