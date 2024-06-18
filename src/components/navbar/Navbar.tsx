import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isUserConnected, logOut } = useAuth();
  const navigate = useNavigate();
  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleDisconnect = () => {
    logOut();
    navigate("/connexion");
  };

  return (
    <nav
      className="flex flex-col sticky z-10 top-0 md:flex-row bg-background items-center justify-around p-6 shadow-md"
      aria-label="Main navigation"
    >
      <div className="flex justify-between w-full md:w-auto items-baseline">
        <Link
          to="/"
          className="text-secondary font-extrabold uppercase flex items-center"
          aria-label="Home"
        >
          <Home className="mx-2" />
          Lingi Club
        </Link>
        <button
          className="md:hidden text-secondary"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls="navbar-menu"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <div
        data-testid="menu"
        id="navbar-menu"
        className={`flex-col md:flex-row mt-6 md:mt-0 items-center gap-y-3 md:gap-2 ${
          isOpen ? "flex" : "hidden"
        } md:flex`}
      >
        {isUserConnected ? (
          <Button onClick={handleDisconnect}>Déconnexion</Button>
        ) : (
          <>
            <Button variant="secondary">
              <Link to="/registration">Inscription</Link>
            </Button>
            <Button variant="outline">
              <Link to="/connexion">Connexion</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;