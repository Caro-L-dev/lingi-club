import { useEffect, useState } from 'react';
import { useAuth } from "@/hooks/useAuth.ts";
import { useAuthContext } from "@/hooks/useAuthContext";
import RadioButtonGroup from "@/components/common/radioBtnGroup/RadioBtnGroup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

   const [emailRegister, setEmailRegister] = useState('');
   const [passwordRegister, setPasswordRegister] = useState('');
 
   const [emailLogin, setEmailLogin] = useState('');
   const [passwordLogin, setPasswordLogin] = useState('');
 
   const { firebaseRegister, firebaseLogIn, loading, error, isUserConnected, logOut } = useAuth();


   const {authUserInfo: authUserInfoFromContext, authUserIsLoading: authUserIsLoadingFromContext } = useAuthContext();

   const [role, setRole] = useState("");
   const [isFamily, setIsFamily] = useState<boolean>(false);

   useEffect(() => {
    role === "family" ? setIsFamily(true) : setIsFamily(false); 
  }
  , [role])

  console.log("ROLE", role)
  console.log("ISFAMILY", isFamily)

  const roleOptions = [
    {
      id: "registrationFamily",
      label: "famille d'accueil",
      value: "family",
    },
    { id: "registrationStudent", label: "apprenant", value: "student" },
  ];

  const handleSubmitRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!role) {
      toast.error("Veuillez sélectionner votre rôle.");
      return;
    }    

    const result = await firebaseRegister({ email: emailRegister, password: passwordRegister, isFamily: isFamily })
    if (result.error) {
      console.error(result.error);
      return
    }
    toast.success("Formulaire 1/2 validé.");
    setTimeout(() => {
      navigate(`/${role}`);
    }, 3000);

   }
 
   const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
     event.preventDefault();
     const result = await firebaseLogIn({ email: emailLogin, password: passwordLogin });
     if (result && result.error) {
      console.error(result.error);
    }
   }

   const handleLogOut = async () => {
    const result = await logOut();
    if (result && result.error) {
      console.error(result.error);
    }
  }
   
  return (
    <>

    <p>{isUserConnected ? "connecté !!!" : "pas connecté"}</p>
    <p className="text-red-500">{error && error}</p>
    <p className="text-cyan-500">{loading ? "LOADING !!!" : "Loaddé"}</p>
    <p>authUserInfoFromContext = <span className="text-red-500">{authUserInfoFromContext?.email}</span></p>
    <p>authUserIsLoadingFromContext = <span className="text-blue-500">{authUserIsLoadingFromContext && "LOADING"}</span></p>

      {/* Pour tester l'inscription */}
      <form onSubmit={handleSubmitRegister}>
        <fieldset>
          <legend className="text-center mb-2 text-sm text-muted-foreground">
            Je souhaite m'inscrire en tant que :
          </legend>
          <RadioButtonGroup
            options={roleOptions}
            name="role"
            defaultValue={role}
            onValueChange={(value) => setRole(value)}
          />
        </fieldset>
        <input
          type="email"
          value={emailRegister}
          onChange={(e) => setEmailRegister(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={passwordRegister}
          onChange={(e) => setPasswordRegister(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" className='bg-purple-100 mt-8'>
          Sign Up (Inscription)
        </button>
      </form>

      {/* Pour tester la connexion */}
      <form onSubmit={handleSubmitLogin}>
        <input
          type="email"
          value={emailLogin}
          onChange={(e) => setEmailLogin(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={passwordLogin}
          onChange={(e) => setPasswordLogin(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" className='bg-cyan-100 mt-8'>
          Log In (Connexion)
        </button>
      </form>
      
      <button onClick={handleLogOut} className='bg-red-100 mt-8 p-2'>
        {isUserConnected ? "Déconnexion" : "Connectez-vous !!"}
      </button>

    </>
  );
}