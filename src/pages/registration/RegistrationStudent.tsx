import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RegistrationStudent = () => {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Apprenant</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
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
          <Button type="submit" className="w-full">
            Valider
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegistrationStudent;
