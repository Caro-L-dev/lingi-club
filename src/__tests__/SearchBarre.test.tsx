import SearchBarre from "@/components/search-barre/SearchBarre";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { test } from "vitest";

describe("SearchBarre Component", () => {
    beforeEach(async () => {
        render(
            <Router>
                <SearchBarre />
            </Router>
        );
    });


    test("Le composant SearchBarre doit afficher les champs de sélection", () => {
        expect(screen.getByText("Choisir une langue")).toBeInTheDocument();
        expect(screen.getByText("Choisir une région")).toBeInTheDocument();
    });

    test("Ne pas afficher une erreur si aucun champ n'est rempli", () => {
        expect(
            screen.queryByText("Au moins un des deux champs doit être rempli")
        ).not.toBeInTheDocument();
    });

    test("Afficher une erreur si le champ langue n'est rempli", async () => {
        const submitButton = screen.getByText("Rechercher");
        expect(submitButton).toBeInTheDocument();
        fireEvent.click(submitButton);
        expect(
            await screen.findByText("Veuillez choisir une langue")
        ).toBeInTheDocument();
    });

    test("Afficher une erreur si le champ region n'est rempli", async () => {
        const submitButton = screen.getByText("Rechercher");
        expect(submitButton).toBeInTheDocument();
        fireEvent.click(submitButton);
        expect(
            await screen.findByText("Veuillez choisir une région")
        ).toBeInTheDocument();

    });


});
