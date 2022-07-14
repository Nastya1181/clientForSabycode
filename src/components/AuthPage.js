import { Link } from "react-router-dom";

export default function AuthPage(props) {
  //Todo: сделать вход через сбис/регистрацию (Настя)
  return (
    <>
    <div className="auth">
      <div className="auth-header">Аутентификация</div>
      <button className="auth-sbis">
        <div className="auth-sbis__logo"></div>
        <div className="auth-sbis__text">Авторизоваться через СБИС</div>
      </button>
      <div class="auth__line"><span>или<br/></span></div>
      <Link className="auth-guest" to="/guestAuthorization">
        <div className="auth-guest__text">Войти, как гость</div>
      </Link>
    </div>
    </>
  );
}
