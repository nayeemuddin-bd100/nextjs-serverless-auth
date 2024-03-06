"use client";

import logoutUser from "@/app/utils/logoutUser";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiMenu, HiX } from "react-icons/hi";

interface MobileMenuProps {
  userData: {
    _id: string;
    name: string;
    email: string;
    password: string;
  };
}
const MobileMenu = ({ userData }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      const res = await logoutUser();

      toast.success("Logout successfully");
      setIsOpen(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <nav className="bg-gray-200 p-4">
      <div className="max-w-5xl w-full mx-auto flex  flex-col justify-between items-center">
        <div className="md:hidden flex items-center">
          {isOpen ? (
            <HiX
              className="text-gray-800 text-2xl cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <HiMenu
              className="text-gray-800 text-2xl cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
        {isOpen && (
          <div className="bg-gray-300  absolute left-0 top-24 w-full flex flex-col gap-4 text-lg py-5 items-center justify-center z-10">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`
                  ${pathname === "/" ? "text-purple-800 underline" : ""}
            text-gray-800 mr-4 hover:underline`}
            >
              Home
            </Link>
            {userData?.email && (
              <Link
                onClick={() => setIsOpen(false)}
                href="/private"
                className={`
        ${pathname === "/private" ? " text-purple-800" : ""}
          text-gray-800 mr-4 hover:underline`}
              >
                Private page
              </Link>
            )}

            {/* Login/Logout Button */}
            {userData?.email ? (
              <button
                className={`
        ${pathname === "/logout" ? " text-purple-800" : ""}
          text-gray-800 mr-4 hover:underline`}
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className={`
        ${pathname === "/login" ? " text-purple-800" : ""}
          text-gray-800 mr-4 hover:underline`}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default MobileMenu;
