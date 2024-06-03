import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const RegistrationFamily = () => {
  const [successMessage, setSuccessMessage] = useState("");

  const handleValidationClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setSuccessMessage("Registration successful!");
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Famille Accueil</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {successMessage && (
            <div className="text-green-500">{successMessage}</div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="nom">Nom</Label>
            <Input id="nom" type="text" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ville">Ville</Label>
            <Input id="ville" type="text" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="region">Region</Label>
            <Input id="region" type="text" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tarif">Tarif/jour</Label>
            <Input id="tarif" type="text" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" type="text" />
          </div>
          <Button
            type="submit"
            onClick={handleValidationClick}
            className="w-full"
          >
            Valider
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegistrationFamily;
