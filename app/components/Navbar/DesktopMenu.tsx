"use client";

import logoutUser from "@/app/utils/logoutUser";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface DesktopMenuProps {
  userData: {
    _id: string;
    name: string;
    email: string;
    password: string;
  };
}
const DesktopMenu = ({ userData }: DesktopMenuProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      const res = await logoutUser();

      toast.success("Logout successfully");
      router.refresh();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <div className="flex items-center">
      <Link
        href="/"
        className={`
        ${pathname === "/" ? " text-purple-800 underline" : ""}
          text-gray-800 mr-4 hover:underline`}
      >
        Home
      </Link>
      {userData?.email && (
        <Link
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
          className={`
        ${pathname === "/login" ? " text-purple-800" : ""}
          text-gray-800 mr-4 hover:underline`}
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default DesktopMenu;
