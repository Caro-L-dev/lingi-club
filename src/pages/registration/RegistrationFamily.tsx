import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineLoading3Quarters } from "@react-icons/all-files/ai/AiOutlineLoading3Quarters";
import { FiCamera } from "@react-icons/all-files/fi/FiCamera";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import MyCalendar from "./MyCalendar";

const familyFormSchema = z.object({
  displayName: z.string().min(1, { message: "Le nom est requis" }),
  region: z.enum(
    [
      "Auvergne-Rhône-Alpes",
      "Bourgogne-Franche-Comté",
      "Bretagne",
      "Centre-Val de Loire",
      "Corse",
      "Grand Est",
      "Hauts-de-France",
      "Île-de-France",
      "Normandie",
      "Nouvelle-Aquitaine",
      "Occitanie",
      "Pays de la Loire",
      "Provence-Alpes-Côte d'Azur",
    ],
    { message: "La région est requise" }
  ),
  city: z.string().min(1, { message: "La ville est requise" }),
  familyDailyRate: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Le tarif journalier doit être un nombre positif",
    }),
  photo: z.instanceof(File).optional(),
});

type FamilyFormData = z.infer<typeof familyFormSchema>;

const RegistrationFamily = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FamilyFormData>({
    mode: "onChange",
    resolver: zodResolver(familyFormSchema),
    defaultValues: {
      displayName: "",
      region: "Auvergne-Rhône-Alpes",
      city: "",
      familyDailyRate: "",
    },
  });

  const [userInfo, setUserInfo] = useState<any>(null);
  const navigate = useNavigate();

  const getUserInfoFromFirestore = async () => {
    try {
      const response = await fetch("/api/userinfo");
      const data = await response.json();
      setUserInfo(data);
      console.log("User Info:", data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    getUserInfoFromFirestore(); // Call it once initially if needed
  }, []);

  const onSubmit = async (data: FamilyFormData) => {
    try {
      let photoUrl = "";
      if (data.photo) {
        const storage = getStorage();
        const storageRef = ref(storage, `photos/${data.photo.name}`);
        const uploadTask = uploadBytesResumable(storageRef, data.photo);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            (error) => {
              toast.error(
                "Une erreur est survenue lors de l'upload de l'image."
              );
              reject(error);
            },
            async () => {
              photoUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      const formDataWithPhotoUrl = { ...data, photoUrl };
      toast.success("Votre inscription a été enregistrée avec succès !");
      console.log("Form data: ", formDataWithPhotoUrl);

      setTimeout(() => {
        navigate("/");
      }, 120000);

      await getUserInfoFromFirestore(); // Appeler getUserInfoFromFirestore immédiatement après la soumission du formulaire
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'inscription.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="responsive-card bg-white p-8 shadow-lg rounded-lg max-w-lg mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Famille d'accueil</h2>

      {/* Ajoutez une section pour afficher les informations utilisateur */}
      {userInfo && (
        <div className="user-info mb-6">
          <h3 className="text-xl font-semibold mb-4">
            Informations utilisateur :
          </h3>
          <pre className="bg-gray-100 rounded-lg p-4">
            {JSON.stringify(userInfo, null, 2)}
          </pre>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            className="block mb-1 font-medium text-gray-700"
            htmlFor="displayName"
          >
            Nom
          </label>
          <Controller
            name="displayName"
            control={control}
            render={({ field }) => (
              <input
                id="displayName"
                {...field}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.displayName
                    ? "border-red-600 ring-red-600"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Nom"
              />
            )}
          />
          {errors.displayName && (
            <p className="text-red-600 text-sm mt-1">
              {errors.displayName.message}
            </p>
          )}
        </div>
        <div>
          <label
            className="block mb-1 font-medium text-gray-700"
            htmlFor="region"
          >
            Région
          </label>
          <Controller
            name="region"
            control={control}
            render={({ field }) => (
              <select
                id="region"
                {...field}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.region
                    ? "border-red-600 ring-red-600"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              >
                <option value="Auvergne-Rhône-Alpes">
                  {" "}
                  Auvergne-Rhône-Alpes{" "}
                </option>
                <option value="Bourgogne-Franche-Comté">
                  {" "}
                  Bourgogne-Franche-Comté{" "}
                </option>
                <option value="Bretagne"> Bretagne </option>
                <option value="Centre-Val de Loire">
                  {" "}
                  Centre-Val de Loire{" "}
                </option>
                <option value="Corse"> Corse </option>
                <option value="Grand Est"> Grand Est </option>
                <option value="Hauts-de-France"> Hauts-de-France </option>
                <option value="Île-de-France"> Île-de-France </option>
                <option value="Normandie"> Normandie </option>
                <option value="Nouvelle-Aquitaine"> Nouvelle-Aquitaine </option>
                <option value="Occitanie"> Occitanie </option>
                <option value="Pays de la Loire"> Pays de la Loire </option>
                <option value="Provence-Alpes-Côte d'Azur">
                  {" "}
                  Provence-Alpes-Côte d'Azur{" "}
                </option>
              </select>
            )}
          />
          {errors.region && (
            <p className="text-red-600 text-sm mt-1">{errors.region.message}</p>
          )}
        </div>
        <div>
          <label
            className="block mb-1 font-medium text-gray-700"
            htmlFor="city"
          >
            Ville
          </label>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <input
                id="city"
                {...field}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.city
                    ? "border-red-600 ring-red-600"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Ville"
              />
            )}
          />
          {errors.city && (
            <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>
        <div>
          <label
            className="block mb-1 font-medium text-gray-700"
            htmlFor="familyDailyRate"
          >
            Tarif journalier
          </label>
          <Controller
            name="familyDailyRate"
            control={control}
            render={({ field }) => (
              <input
                id="familyDailyRate"
                type="number"
                {...field}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.familyDailyRate
                    ? "border-red-600 ring-red-600"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Tarif journalier"
              />
            )}
          />
          {errors.familyDailyRate && (
            <p className="text-red-600 text-sm mt-1">
              {errors.familyDailyRate.message}
            </p>
          )}
        </div>
        <div>
          <label
            className="block mb-1 font-medium text-gray-700"
            htmlFor="photo"
          >
            Photo <FiCamera className="inline-block text-gray-500" />
          </label>
          <Controller
            name="photo"
            control={control}
            render={({ field: { onChange, onBlur, ref } }) => (
              <input
                id="photo"
                type="file"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept="image/*"
                onChange={(e) => onChange(e.target.files?.[0])}
                onBlur={onBlur}
                ref={ref}
              />
            )}
          />
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">
            Sélectionnez vos disponibilités
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Cliquez sur une plage de dates pour ajouter un événement, puis
            cliquez sur l'événement pour le modifier ou le supprimer.
          </p>
          <MyCalendar />
        </div>
        <div className="submit-button-container mt-6">
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-lg flex justify-center items-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                Chargement...
              </span>
            ) : (
              "Valider mon inscription"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationFamily;
