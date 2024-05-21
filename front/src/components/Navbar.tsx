import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Home, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex flex-col sticky top-0 md:flex-row bg-background items-center justify-between p-6 shadow-md">
      <div className="flex justify-between w-full md:w-auto items-center">
        <Link
          to="/"
          className="text-secondary font-extrabold uppercase flex items-center"
        >
          <Home className="mx-2" />
          Lingi Club
        </Link>
        <button className="md:hidden text-secondary" onClick={toggleMenu}>
          <span>
            {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </span>
        </button>
      </div>
      <div
        className={`flex-col mt-9 md:mt-0 md:flex-row md:flex items-center ${
          isOpen ? "flex" : "hidden"
        } md:flex`}
      >
        <Button variant={"secondary"} className="mb-2 md:mb-0 md:mx-2">
          <Link to="/registration">Inscription</Link>
        </Button>
        <Button variant={"outline"}>
          <Link to="/login">Connexion</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
