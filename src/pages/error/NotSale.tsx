import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


const NotSale = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-8">
            <h2 className="text-center text-xl lg:text-4xl p-8">
                Oups, il semblerait que les réservations ne soient pas encore
                ouvertes !
            </h2>
            <p className="text-center pb-8">Merci de revenir plus tard.</p>
            <Link to="/">
            <Button variant="secondary">Accueil</Button>
            </Link>
        </div>
    );
};

export default NotSale;