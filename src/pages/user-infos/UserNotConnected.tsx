import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


const UserNotConnected = () => {
    return (
        <div className="flex flex-col h-80 justify-center items-center gap-8">
            <h2 className="text-xl xl:text-4xl text-center">
                Il semblerait que vous ne soyez pas connecté
            </h2>
            <div>
                <Button variant="default">
                    <Link to="/connexion">Connexion</Link>
                </Button>
            </div>
        </div>
    );
};

export default UserNotConnected;