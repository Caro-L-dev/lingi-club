import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRegistrationClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!role) {
      alert("¨Please select a role");
      return;
    }
    navigate(`/${role}`);
  };
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>

            <div>
              <input
                type="radio"
                id="family"
                name="role"
                value="family"
                onChange={() => setRole("family")}
              />
              <label htmlFor="family">Family</label>

              <input
                type="radio"
                id="student"
                name="role"
                value="student"
                onChange={() => setRole("student")}
              />
              <label htmlFor="student">Student</label>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button
              type="submit"
              onClick={handleRegistrationClick}
              className="w-full"
            >
              Registration
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
