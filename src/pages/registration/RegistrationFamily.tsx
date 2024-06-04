import CommonForm from "@/components/common/CommonForm";
import { useState } from "react";

const RegistrationFamily = () => {
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = (data) => {
    setSuccessMessage("Registration successful!");
    console.log(data);
  };

  const fields = [
    {
      name: "nom",
      label: "Nom",
      type: "text",
      required: true,
      errorMessage: "Nom is required",
    },
    {
      name: "ville",
      label: "Ville",
      type: "text",
      required: true,
      errorMessage: "Ville is required",
    },
    {
      name: "region",
      label: "Region",
      type: "text",
      required: true,
      errorMessage: "Region is required",
    },
    {
      name: "tarif",
      label: "Tarif/jour",
      type: "text",
      required: true,
      errorMessage: "Tarif is required",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      required: true,
      errorMessage: "Description is required",
    },
  ];

  return (
    <div>
      {successMessage && (
        <div className="text-green-500 text-center">{successMessage}</div>
      )}
      <CommonForm
        title="Famille d'accueil"
        fields={fields}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default RegistrationFamily;
