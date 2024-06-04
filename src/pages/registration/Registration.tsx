import CommonForm from "@/components/common/CommonForm"; // Import the CommonForm component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleInscriptionClick = (data: any) => {
    if (!role) {
      return;
    }
    setTimeout(() => {
      navigate(`/${role}`);
    }, 3000); // Augmenter le délai à 3 secondes
  };

  const fields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      errorMessage: "Email is required",
    },
    {
      name: "password",
      label: "Mot de passe",
      type: "password",
      required: true,
      errorMessage: "Password is required",
    },
  ];

  return (
    <Card className="mx-auto max-w-md p-8 shadow-lg rounded-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-blue-600">
          INSCRIPTION
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6">
          <Label className="text-center text-lg font-medium text-gray-700">
            Je souhaite m'inscrire en tant que :
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
              <label htmlFor="family" className="cursor-pointer text-gray-600">
                FAMILLE D'ACCUEIL
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
              <label htmlFor="student" className="cursor-pointer text-gray-600">
                APPRENANT
              </label>
            </div>
          </div>
          <Label className="text-center mt-4 text-lg font-medium text-gray-700">
            Je crée mon compte :
          </Label>
          <CommonForm
            title=""
            fields={fields}
            onSubmit={handleInscriptionClick}
          />
        </div>
      </CardContent>
    </Card>
  );
}
