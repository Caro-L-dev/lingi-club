import PaiementForm from "./PaiementForm";
import { useLocation } from "react-router";

const Paiement = () => {
    const location = useLocation();
    const price: number = location.state;
    return (
    <div className="mx-auto mt-8">
        <PaiementForm price={price} />
    </div>
    )
};

export default Paiement;
