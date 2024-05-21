import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";

describe("Navbar Component", () => {
  it("renders correctly", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    expect(screen.getByText(/Lingi Club/i)).toBeInTheDocument();
    expect(screen.getByText(/Inscription/i)).toBeInTheDocument();
    expect(screen.getByText(/Connexion/i)).toBeInTheDocument();
  });

  it("toggles the menu when the button is clicked", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const toggleButton = screen.getByLabelText(/Toggle navigation menu/i);
    const menu = screen.getByTestId("menu");

    expect(menu).toHaveClass("hidden");
    fireEvent.click(toggleButton);
    expect(menu).not.toHaveClass("hidden");

    fireEvent.click(toggleButton);
    expect(menu).toHaveClass("hidden");
  });
});
