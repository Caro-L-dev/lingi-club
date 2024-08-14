import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

describe("Navbar component", () => {
  beforeEach(() => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
  });

  it("toggles the menu when the button is clicked", () => {
    const toggleButton = screen.getByLabelText(/Toggle navigation menu/i);
    const menu = screen.getByTestId("menu");

    expect(menu).toHaveClass("hidden");
    fireEvent.click(toggleButton);
    expect(menu).not.toHaveClass("hidden");

    fireEvent.click(toggleButton);
    expect(menu).toHaveClass("hidden");
  });

  // On vérifie que le lien de redirection vers la page de connexion existe et renvoie vers la bonne page
  it("should contains link redirecting to login Page", () => {
    const link = screen.getByRole("link", { name: /connexion/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/connexion");
  });
  it("should navigate to the login page when the register link is clicked", () => {
    const registerLink = screen.getByRole("link", { name: /connexion/i });
    fireEvent.click(registerLink);
    expect(window.location.pathname).toBe("/connexion");
  });
  it("should contains link redirecting to registration Page", () => {
    const link = screen.getByRole("link", { name: /inscription/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/registration");
  });
  it("should navigate to the registration page when the register link is clicked", () => {
    const registerLink = screen.getByRole("link", { name: /inscription/i });
    fireEvent.click(registerLink);
    expect(window.location.pathname).toBe("/registration");
  });
});
