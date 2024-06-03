import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [role, setRole] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleInscriptionClick = (event) => {
    event.preventDefault();
    if (!role) {
      return;
    }
    setSuccessMessage("Registration successful!");
    setTimeout(() => {
      setSuccessMessage("");
      navigate(`/${role}`);
    }, 2000);
  };

  return (
    <Card className="mx-auto max-w-sm p-6 shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Sign Up
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6">
          {successMessage && (
            <div className="text-green-500 text-center">{successMessage}</div>
          )}
          <div className="grid gap-4">
            <Label htmlFor="role" className="font-semibold">
              Role
            </Label>
            <div className="flex justify-around">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="family"
                  name="role"
                  value="family"
                  onChange={() => setRole("family")}
                  className="mr-2"
                />
                <label htmlFor="family" className="cursor-pointer">
                  Accueil
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="student"
                  name="role"
                  value="student"
                  onChange={() => setRole("student")}
                  className="mr-2"
                />
                <label htmlFor="student" className="cursor-pointer">
                  Apprenant
                </label>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="font-semibold">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                className="border p-2 rounded-lg"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="font-semibold">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                className="border p-2 rounded-lg"
              />
            </div>
            <Button
              type="submit"
              onClick={handleInscriptionClick}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Inscription
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
