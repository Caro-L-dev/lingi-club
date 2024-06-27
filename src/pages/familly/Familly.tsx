import { useLocation } from "react-router";

// PAGE DE TEST CHANGER AVEC LA VRAIE PAGE D'AFFICHAGE DES FAMILLES FILTREES

const Familly = () => {
    const location = useLocation();
    const { state } = location;
    return <p>{state.key.region}</p>;
};

export default Familly;
