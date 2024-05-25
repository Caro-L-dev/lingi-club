import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Registration = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { register } = useForm();

  const handleRegistrationClick = (event) => {
    event.preventDefault();
    if (!role) {
      return;
    }
    toast.success("Registration successful!");

    setTimeout(() => {
      navigate(`/${role}`);
    }, 3000);
  };

  return (
    <Card className="max-w-2xl mx-auto mt-10 p-6 shadow-lg">
      <CardHeader className="text-center text-2xl font-bold mb-4">
        Inscription
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleRegistrationClick}>
          <div className="flex items-center space-x-4">
            <Input
              type="radio"
              id="registrationFamily"
              name="role"
              value="family"
              onChange={() => setRole("family")}
              className="h-4 w-4"
            />
            <Label htmlFor="registrationFamily" className="text-lg">
              Famille
            </Label>
            <Input
              type="radio"
              id="registrationStudent"
              name="role"
              value="student"
              onChange={() => setRole("student")}
              className="h-4 w-4"
            />
            <Label htmlFor="registrationStudent" className="text-lg">
              Etudiant
            </Label>
          </div>
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              {...register("email")}
            />
          </div>
          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Mot de passe
            </Label>
            <Input
              id="password"
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              {...register("password")}
            />
          </div>
          <div className="text-center">
            <Button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md"
            >
              Registration
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Registration;
