import { useLocation } from "react-router";

const Familly = () => {
    const location = useLocation();
    const { state } = location;
    return <p>{state.key.region}</p>;
};

export default Familly;
