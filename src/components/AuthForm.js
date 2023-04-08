function AuthForm() {

  return (
    <section className="auth-form">
      <h2 className="auth-form__title">Регистрация</h2>
      <form>
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
      <a
        href="/"
        className="auth-form__link">
        Уже зарегистрированы? Войти
      </a>
    </section>
  )
}

export default AuthForm
