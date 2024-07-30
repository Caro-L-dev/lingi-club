import { useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

type Props = {
    price: number
}

const PaiementForm = ({price}: Props) => {
    const navigate = useNavigate();
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [cvc, setCVC] = useState("");
    const [errors, setErrors] = useState({
        cardNumber: false,
        expirationDate: false,
        cvc: false,
        cardholderName: false,
    });
    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        let hasErrors = false;
        if (!cardNumber.trim()) {
            setErrors((prev) => ({ ...prev, cardNumber: true }));
            hasErrors = true;
        } else {
            setErrors((prev) => ({ ...prev, cardNumber: false }));
        }
        if (cardNumber.length !== 16) {
            setErrors((prev) => ({ ...prev, cardNumber: true }));
            hasErrors = true;
        } else {
            setErrors((prev) => ({ ...prev, cardNumber: false }));
        }
        if (!expirationDate.trim()) {
            setErrors((prev) => ({ ...prev, expirationDate: true }));
            hasErrors = true;
        } else {
            setErrors((prev) => ({ ...prev, expirationDate: false }));
        }
        if (expirationDate.length !== 5) {
            setErrors((prev) => ({ ...prev, expirationDate: true }));
            hasErrors = true;
        } else {
            setErrors((prev) => ({ ...prev, expirationDate: false }));
        }
        if (!cvc.trim()) {
            setErrors((prev) => ({ ...prev, cvc: true }));
            hasErrors = true;
        } else {
            setErrors((prev) => ({ ...prev, cvc: false }));
        }
        if (cvc.length !== 3) {
            setErrors((prev) => ({ ...prev, cvc: true }));
            hasErrors = true;
        } else {
            setErrors((prev) => ({ ...prev, cvc: false }));
        }

        if (!hasErrors) {
            navigate("/payment-valide");
        }
    };
    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Paiement par carte</CardTitle>
                {/* Par défaut j'ai mis 5 jours de réservation */}
                <p className="py-2 text-secondary">Montant de la transaction: <span className="text-lg">{price * 5}</span> euros</p>
                <CardDescription>
                    Entrez vos informations de paiement.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="card-number">Numéro de carte</Label>
                        <Input
                            id="card-number"
                            placeholder="Entrez le numéro de votre carte"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className={
                                errors.cardNumber ? "border-red-500" : ""
                            }
                        />
                        {errors.cardNumber && (
                            <p className="text-red-500 text-sm">
                                Un numéro de carte valide est requis.
                            </p>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                            <Label htmlFor="expiration-date">
                                Date d'expiration
                            </Label>
                            <Input
                                id="expiration-date"
                                placeholder="MM/AA"
                                value={expirationDate}
                                onChange={(e) =>
                                    setExpirationDate(e.target.value)
                                }
                                className={
                                    errors.expirationDate
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {errors.expirationDate && (
                                <p className="text-red-500 text-sm">
                                    La date d'expiration est requise.
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input
                                id="cvc"
                                placeholder="CVC"
                                value={cvc}
                                onChange={(e) => setCVC(e.target.value)}
                                className={errors.cvc ? "border-red-500" : ""}
                            />
                            {errors.cvc && (
                                <p className="text-red-500 text-sm">
                                    Le code CVC est requis.
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="mt-8">
                        <Button type="submit" className="w-full">
                            Payer
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export default PaiementForm;