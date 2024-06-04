import CommonForm from "@/components/common/CommonForm";
import { useState } from "react";

const RegistrationStudent = () => {
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
  ];

  return (
    <div>
      {successMessage && (
        <div className="text-green-500 text-center">{successMessage}</div>
      )}
      <CommonForm title="Apprenant" fields={fields} onSubmit={onSubmit} />
    </div>
  );
};

export default RegistrationStudent;
