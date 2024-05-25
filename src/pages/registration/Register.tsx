import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Importe react-toastify

export default function LoginForm() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { register } = useForm();

  const handleRegistrationClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!role) {
      return;
    }
    // Affiche une notification avant de rediriger
    toast.success("Registration successful!");

    // Retarde la redirection de 3 secondes
    setTimeout(() => {
      navigate(`/${role}`);
    }, 3000);
  };

  return (
    <Card>
      <CardHeader>Registration</CardHeader>
      <CardContent>
        <form className="mx-auto max-w-sm">
          <div>
            <div>
              <Input
                type="radio"
                id="family"
                name="role"
                value="family"
                onChange={() => setRole("family")}
              />
              <Label htmlFor="family">Family</Label>
              <Input
                type="radio"
                id="student"
                name="role"
                value="student"
                onChange={() => setRole("student")}
              />
              <Label htmlFor="student">Student</Label>
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
          </div>
          <div>
            <Button type="submit" onClick={handleRegistrationClick}>
              Registration
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
