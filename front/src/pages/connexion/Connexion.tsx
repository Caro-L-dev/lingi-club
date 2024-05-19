import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Link } from "react-router-dom";


type User = {
    login: string,
    userId: string
}

const Connexion = () => {

    const userDemo: User = {
        login: 'José',
        userId: 'lilianne'
    }

    !userDemo && (<h2>User not connected</h2>)

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                <div className="space-y-2 text-center">
                    <h2 className="text-3xl font-bold">Bienvenu !</h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        Entrez votre email et mot de passe
                    </p>
                </div>
                <form className="space-y-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            placeholder="nom@example.com"
                            required
                            type="email"
                        />
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Link
                                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                to="#"
                            >
                                Mot de passe oublié ?
                            </Link>
                        </div>
                        <Input id="password" required type="password" />
                    </div>
                    <Button className="w-full" type="submit">
                        Connexion
                    </Button>
                </form>
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                   Pas encore de compte? 
                    <Link
                        className="font-medium text-gray-900 hover:underline dark:text-gray-200 pl-2"
                        to="#"
                    >
                        Inscrivez-vous
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Connexion;