import AuthForm from "./AuthForm";

function Login({ handleSubmit }) {
  return (
    <AuthForm title='Вход' btnText='Войти' handleSubmit={handleSubmit} />
  )
}

export default Login
