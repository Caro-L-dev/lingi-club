import { Wrapper } from "./components/common/wrapper/Wrapper";
import { Title } from "./components/common/title/Title";
import { TypographyP } from "./components/common/typographyP/TypographyP";
import { useRegister, useLogIn } from "../api/authentification";
import { useState } from 'react';

function App() {
  const [emailRegister, setEmailRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');

  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  const { register, loading: loadingRegister, error: errorRegister } = useRegister();
  const { logIn, loading: loadingLogin, error: errorLogin } = useLogIn();

  const handleSubmitRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    register(emailRegister, passwordRegister);
  }

  const handleSubmitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    logIn(emailLogin, passwordLogin);
  };

  return (
    <Wrapper className="flex flex-col items-center justify-center h-screen">
      <Title>Lingi Club</Title>
      <TypographyP>Under construction ... 🚧</TypographyP>

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
        {errorRegister && <p className="text-red-500">{errorRegister}</p>}
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
        {errorLogin && <p className="text-red-500">{errorLogin}</p>}
      </form>

    </Wrapper>
  );
}

export default App;

