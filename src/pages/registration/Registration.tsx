import CommonForm from "@/components/common/CommonForm"; // Import the CommonForm component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleInscriptionClick = (data) => {
    if (!role) {
      return;
    }
    setTimeout(() => {
      navigate(`/${role}`);
    }, 2000);
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
    <Card className="mx-auto max-w-sm p-6 shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          INSCRIPTION
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6">
          <Label className="text-center">
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
              <label htmlFor="family" className="cursor-pointer">
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
              <label htmlFor="student" className="cursor-pointer">
                APPRENANT
              </label>
            </div>
          </div>
          <Label className="text-center mt-4">Je crée mon compte :</Label>
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
