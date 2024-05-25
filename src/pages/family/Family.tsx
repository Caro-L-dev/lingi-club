import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const Family = () => {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Host Family</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="nom">Name</Label>
            <Input id="nom" type="text" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ville">City</Label>
            <Input id="ville" type="text" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="region">Region</Label>
            <Input id="region" type="text" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tarif">Rate per day</Label>
            <Input id="tarif" type="text" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" type="text" />
          </div>
          <Button type="submit" className="w-full">
            Validate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Family;