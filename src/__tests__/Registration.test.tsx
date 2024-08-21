import Registration from "@/pages/registration/Registration";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";

describe("component PageRegister", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Registration />
      </BrowserRouter>
    );
  });

  // On vérifie que les composants du formulaires existent
  it("should contains form element", () => {
    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
  });
  it("should contains input email", () => {
    const input = screen.getByLabelText(/email/i);
    expect(input).toBeInTheDocument();
  });
  it("should contains input password", () => {
    const input = screen.getByLabelText("Mot de passe");
    expect(input).toBeInTheDocument();
  });
  it("should contains input submit", () => {
    const input = screen.getByRole("button");
    expect(input).toBeInTheDocument();
  });

  // On vérifie que la valeur des champs est mise à jour correctement
  it("should update the email field as the user types", () => {
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: "user@example.com" } });
    expect(emailInput.value).toBe("user@example.com");
  });
  it("should update the password field as the user types", () => {
    const passwordInput = screen.getByLabelText(
      "Mot de passe"
    ) as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: "password" } });
    expect(passwordInput.value).toBe("password");
  });
});
