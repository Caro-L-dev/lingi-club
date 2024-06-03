import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleInscriptionClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!role) {
      alert("Veuillez sélectionner un rôle avant de vous inscrire");
      return;
    }
    navigate(`/${role}`);
  };
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>

            <div>
              <input
                type="radio"
                id="accueil"
                name="role"
                value="accueil"
                onChange={() => setRole("accueil")}
              />
              <label htmlFor="accueil">Accueil</label>

              <input
                type="radio"
                id="apprenant"
                name="role"
                value="apprenant"
                onChange={() => setRole("apprenant")}
              />
              <label htmlFor="apprenant">Apprenant</label>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button
              type="submit"
              onClick={handleInscriptionClick}
              className="w-full"
            >
              Inscription
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
