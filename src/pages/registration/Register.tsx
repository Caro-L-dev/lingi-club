import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card"; // Remove extra curly braces
import { Input } from "@/components/ui/input"; // Add missing import statement
import { Label } from "@/components/ui/label"; // Add missing import statement
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRegistrationClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!role) {
      alert("Please select a role"); // Remove extra character
      return;
    }
    navigate(`/${role}`);
  };
  const { register } = useForm();
  return (
    // Add missing closing tag
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
