import { selectIsAuthenticated } from "../redux/features/authentication/authenticationSlice";
import { useSelector } from "react-redux/es/exports";

export default function Header() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <header className="header">
      <div className="header__logo"></div>
      {(localStorage.userName || isAuthenticated) && (
        <>
          <button
            className="invite-button"
            onClick={() => {
              navigator.clipboard.writeText(window.location);
              alert("ссылка скопирована!"); //Todo: поменять на какой-нибудь визуальный эффект
            }}
          >
            <div className="invite-button__text">пригласить</div>
          </button>
        </>
      )}
    </header>
  );
}
