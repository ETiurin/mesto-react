import React from "react";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    handleLogin({
      userEmail: email,
      userPassword: password,
    })
      .then(() => {
        setEmail("");
        setPassword("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="auth__form" noValidate>
        <h2 className="auth__title">Вход</h2>
        <input
          className="auth__input"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          autoComplete="off"
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={password}
          className="auth__input"
          onChange={handlePasswordChange}
          autoComplete="off"
        />
        <button type="submit" className="auth__button">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
