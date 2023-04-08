function AuthForm() {

  return (
    <form className="auth-form">
      <label className="auth-form__input-wrapper">
        <input
        type="email"
        name="userEmail"
        className="auth-form__input"
        placeholder="Email"
        required />
        <span className="auth-form__input-error">
        </span>
      </label>

      <label className="auth-form__input-wrapper">
        <input
        type="text"
        name="userPassword"
        className="auth-form__input"
        placeholder="Пароль"
        minLength="2"
        maxLength="30"
        required />
        <span className="auth-form__input-error">
        </span>
      </label>

      <button type="submit" className="auth-form__submit-btn">
        Войти
      </button>
    </form>
  )
}

export default AuthForm
