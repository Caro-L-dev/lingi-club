import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";


const ConnexionNavigate = () => {
    return (
        <div
            className="flex h-screen items-center justify-center dark:bg-gray-900"
            role="main"
        >
            <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                <div className="space-y-2 text-center">
                    <h2 className="text-3xl font-bold">Oups !</h2>
                    <p className="text-gray-500 dark:text-gray-400 pt-4 pb-8">
                        Il semble que vous soyez déja connecté
                    </p>
                    <Link
                        to="/"
                        className={buttonVariants({ variant: "secondary" })}
                    >
                        Click here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ConnexionNavigate;