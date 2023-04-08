import AuthForm from "./AuthForm";

function Register() {
  return (
    <AuthForm title='Регистрация' btnText='Зарегистрироваться'>
      <a
        href="/"
        className="auth-form__link">
        Уже зарегистрированы? Войти
      </a>
    </AuthForm>
  )
}

export default Register
