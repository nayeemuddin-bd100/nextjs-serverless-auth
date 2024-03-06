import getUser from "@/app/lib/getUser";
import Link from "next/link";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const { userData } = getUser();


  return (
    <nav className="  bg-gray-200 p-4">
      <div className=" max-w-5xl w-full mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className=" text-xl font-bold text-purple-700">
            Lantabur Softech
          </Link>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <DesktopMenu userData={userData} />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <MobileMenu userData={userData} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
