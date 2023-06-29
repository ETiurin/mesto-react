import React from "react";
import { Link } from "react-router-dom";

const Register = ({ handleRegister }) => {
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

    handleRegister({
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
    <form
      onSubmit={handleSubmit}
      className="auth__form"
      noValidate
      name="register"
    >
      <h2 className="auth__title">Регистрация</h2>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        className="auth__input"
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
        Зарегистрироваться
      </button>
      <div className="auth__signin">
        <Link to="/sign-in" className="auth__login-link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </form>
  );
};

export default Register;
