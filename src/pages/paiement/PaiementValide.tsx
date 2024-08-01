import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TicketCheck } from "lucide-react";

const PaiementValide = () => {
    return (
        <div className="flex items-center justify-center mt-8 ">
            <div className="flex flex-col items-center justify-center border border-1 p-4 rounded-xl">
                <TicketCheck size={64} color="green" />
                <h2 className="text-center text-xl lg:text-4xl p-8">
                    Réservation confirmée !
                </h2>
                <div className="text-center text-gray-500 space-y-2 mb-8">
                    <p>Félicitations pour votre achat !</p>
                    <p>Votre paiement est validé.</p>
                    <p>Nous espérons que vous passerez un agréable séjour.</p>
                </div>
                <Link to="/">
                    <Button>Retour à l'accueil</Button>
                </Link>
            </div>
        </div>
    );
};

export default PaiementValide;
