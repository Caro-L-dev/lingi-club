import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Registration = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { register } = useForm();

  const handleRegistrationClick = (event) => {
    event.preventDefault();
    if (!role) {
      return;
    }
    toast.success("Veuillez renseigner vos informations.");

    setTimeout(() => {
      navigate(`/${role}`);
    }, 3000);
  };

  return (
    <Card>
      <CardHeader className="text-center uppercase text-2xl font-bold mb-4">
        Inscription
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleRegistrationClick}>
          <div className="flex items-center justify-around">
            <div className="flex items-center gap-2">
              <Input
                type="radio"
                id="registrationFamily"
                name="role"
                value="family"
                onChange={() => setRole("family")}
              />
              <Label htmlFor="registrationFamily">Famille</Label>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="radio"
                id="registrationStudent"
                name="role"
                value="student"
                onChange={() => setRole("student")}
              />
              <Label htmlFor="registrationStudent">Apprenant</Label>
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
          </div>
          <div>
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" {...register("password")} />
          </div>

          <Button type="submit" className="w-full">
            Poursuivre mon inscription
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Registration;
