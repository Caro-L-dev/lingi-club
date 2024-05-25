import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect, test, vi } from "vitest";
import Connexion, { User } from "../src/pages/connexion/Connexion";
import { describe } from "node:test";

// Mock ConnexionForm
vi.mock("../src/pages/connexion/ConnexionForm", () => {
    return {
        default: ({ onSubmit, form }) => (
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <input
                    name="email"
                    placeholder="Email"
                    ref={form.register("email")}
                />
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    ref={form.register("password")}
                />
                <button type="submit" onSubmit={onSubmit}>
                    Connexion
                </button>
            </form>
        ),
    };
});

const userFakeConnect: User = {
    login: "José",
    userId: "myid",
};

const userNotConnect: User = {
    login: "test",
    userId: "test",
};

describe("Test affichage si user deja connecté ou non", () => {
    test("Le user est deja connecté et doit afficher User connected", async () => {
        render(<Connexion userId={userFakeConnect.userId} login={""} />);

        const title = screen.getByText("User connected");
        expect(title).toBeInTheDocument();
    });

    test("Le user n'est pas connecté et ne doit afficher User connected", async () => {
        render(<Connexion userId={userNotConnect.userId} login={"test"} />);

        const title = await screen.queryByText("User connected");
        expect(title).not.toBeInTheDocument();
    });
});

