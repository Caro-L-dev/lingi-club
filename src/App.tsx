import { useState } from 'react';
import { Wrapper } from "./components/common/wrapper/Wrapper";
import { Title } from "./components/common/title/Title";
import { TypographyP } from "./components/common/typographyP/TypographyP";
import { useAuth } from "@/hooks/useAuth.ts";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  const [emailRegister, setEmailRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');

  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  const { register, logIn, loading, error } = useAuth();

  const handleSubmitRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await register({ email: emailRegister, password: passwordRegister });
      console.log(result);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }

  const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await logIn({ email: emailLogin, password: passwordLogin });
      console.log(result);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }

  return (
    <Wrapper className="flex flex-col items-center justify-center h-screen">
      <Title>Lingi Club</Title>
      <TypographyP>Under construction ... 🚧</TypographyP> 

      <ToastContainer />

      {/* Pour tester l'inscription */}
      <p className="py-4">Inscription</p>
      <form onSubmit={handleSubmitRegister}>
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
        <button type="submit">
          Sign Up
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>

      {/* Pour tester la connexion */}
      <p className="py-4">Connexion</p>
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
        <button type="submit">
          Log In
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>

      
      
    </Wrapper>
  );
}

export default App;
