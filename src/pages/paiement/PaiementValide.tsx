import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PaiementValide = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-8">
            <h2 className="text-center text-xl lg:text-4xl p-8">
                Réservation confirmée !
            </h2>
            <p className="text-center pb-8">Merci pour votre achat</p>
            <Link to="/">
                <Button>Accueil</Button>
            </Link>
        </div>
    );
};

export default PaiementValide;