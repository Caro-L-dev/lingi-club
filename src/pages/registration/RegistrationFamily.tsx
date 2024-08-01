import { zodResolver } from "@hookform/resolvers/zod";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import MyCalendar from "./MyCalendar";
import "./Registration.css";

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
  familyDalyRate: z
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
      familyDalyRate: "",
    },
  });
  const navigate = useNavigate();

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
      }, 5000);
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'inscription.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="responsive-card">
      <h2 className="text-lg font-semibold mb-2">Famille d'accueil</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Controller
            name="displayName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Nom"
              />
            )}
          />
          {errors.displayName && (
            <p className="text-red-500 text-sm">{errors.displayName.message}</p>
          )}
        </div>
        <div>
          <Controller
            name="region"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="Auvergne-Rhône-Alpes">
                  Auvergne-Rhône-Alpes
                </option>
                <option value="Bourgogne-Franche-Comté">
                  Bourgogne-Franche-Comté
                </option>
                <option value="Bretagne">Bretagne</option>
                <option value="Centre-Val de Loire">Centre-Val de Loire</option>
                <option value="Corse">Corse</option>
                <option value="Grand Est">Grand Est</option>
                <option value="Hauts-de-France">Hauts-de-France</option>
                <option value="Île-de-France">Île-de-France</option>
                <option value="Normandie">Normandie</option>
                <option value="Nouvelle-Aquitaine">Nouvelle-Aquitaine</option>
                <option value="Occitanie">Occitanie</option>
                <option value="Pays de la Loire">Pays de la Loire</option>
                <option value="Provence-Alpes-Côte d'Azur">
                  Provence-Alpes-Côte d'Azur
                </option>
              </select>
            )}
          />
          {errors.region && (
            <p className="text-red-500 text-sm">{errors.region.message}</p>
          )}
        </div>
        <div>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Ville"
              />
            )}
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
        </div>
        <div>
          <Controller
            name="familyDalyRate"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Tarif journalier"
              />
            )}
          />
          {errors.familyDalyRate && (
            <p className="text-red-500 text-sm">
              {errors.familyDalyRate.message}
            </p>
          )}
        </div>
        <div>
          <Controller
            name="photo"
            control={control}
            render={({ field: { onChange, onBlur, ref } }) => (
              <input
                type="file"
                className="w-full p-2 border border-gray-300 rounded"
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
          <p className="text-sm text-muted-foreground">
            Cliquez sur une plage de dates pour ajouter un événement, puis
            cliquez sur l'événement pour le modifier ou le supprimer.
          </p>
          <MyCalendar />
        </div>
        <div className="submit-button-container">
          <button
            type="submit"
            className="w-full mt-5 uppercase bg-blue-500 hover:bg-blue-700"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Chargement..." : "Valider mon inscription"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationFamily;
