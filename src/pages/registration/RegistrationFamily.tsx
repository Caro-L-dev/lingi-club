// import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

// import { TitleCard } from "@/components/common/titleCard/TitleCard";
// import FormField from "@/components/common/formField/FormField";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { useState } from "react"
import { addOrUpdateDataToFirebase } from "@/firebase/firestore"
import { useAuthContext } from "@/hooks/useAuthContext";

const RegistrationFamily = () => {
  // const methods = useForm({
  //   mode: "context",
  // });

  // const onSubmit = (data) => {
  //   toast.success("Votre famille a été enregistrée avec succès !");
  // };

  const [displayName, setDisplayName] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { authUserInfo, authUserIsLoading } = useAuthContext();

  const handleSubmitRegisterFamily = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    if (authUserInfo) {
      const result = await addOrUpdateDataToFirebase('users', authUserInfo.uid, { displayName, region, city, description });
      
      console.log(result)
    }
   
    toast.success("Formulaire 1/2 validé.");
  }

  return (
    <form onSubmit={handleSubmitRegisterFamily} className="flex flex-col space-y-4">
      {/* Pour tester l'inscription FAMILLE */}
      <input
        type="nom"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Nom"
        required
      />
      <input
        type="region"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        placeholder="Region"
      //required
      />
      <input
        type="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Ville"
      //required
      />
      {/* <input
        type="photo"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
        placeholder="Photo"
      //required
      /> */}
      <input
        type="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      //required
      />

      {/* <img src={photoUrl} alt="Image sélectionnée" width="100" height="100" />
      <img src={photoUrl} alt="Image sélectionnée" style={{ width: '100px', height: 'auto' }} />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
              if (event.target && typeof event.target.result === 'string') {
                setPhotoUrl(event.target.result);
              }
            };
            reader.readAsDataURL(e.target.files[0]);
          }
        }}
      /> */}

      <button type="submit" className='bg-purple-200 mt-8 p-4'>
        Valider INSCRIPTION FAMILLE
      </button>
    </form>

    
    // <FormProvider {...methods}>
    //   <Card>
    //     <CardHeader>
    //       <TitleCard>Famille d'accueil</TitleCard>
    //     </CardHeader>
    //     <CardContent>
    //       <form onSubmit={methods.handleSubmit(onSubmit)}>
    //         <fieldset>
    //           <FormField id="name" label="Nom" />
    //         </fieldset>
    //         <fieldset>
    //           <FormField id="region" label="Région" />
    //           <FormField id="city" label="Ville" />
    //         </fieldset>
    //         <fieldset>
    //           <FormField id="rate" label="Tarif/jour" />
    //         </fieldset>
    //         <fieldset>
    //           <FormField id="description" label="Description" />
    //         </fieldset>
    //         <Button type="submit" className="w-full mt-5 uppercase">
    //           Valider l'inscription de ma famille
    //         </Button>
    //       </form>
    //     </CardContent>
    //   </Card>
    // </FormProvider>
  );
};

export default RegistrationFamily;