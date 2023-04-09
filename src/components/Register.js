import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register({ handleSubmit }) {
  return (
    <AuthForm title='Регистрация' btnText='Зарегистрироваться' handleSubmit={handleSubmit}>
      <Link
        to="/"
        className="auth-form__link">
        Уже зарегистрированы? Войти
      </Link>
    </AuthForm>
  )
}

export default Register
