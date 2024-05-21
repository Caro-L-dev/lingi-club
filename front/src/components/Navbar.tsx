import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="flex bg-background justify-between p-4 lg:mx-20">
      <Link to="/" className="text-secondary font-extrabold uppercase">
        Lingi Club
      </Link>
      <div>
        <Button variant={"secondary"} className="mx-2">
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
