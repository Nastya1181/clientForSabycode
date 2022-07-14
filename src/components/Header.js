import { selectIsAuthenticated } from "../redux/features/authentication/authenticationSlice";
import { useSelector } from "react-redux/es/exports";
import React, { useState } from "react"
export default function Header() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const initialState = "ПРИГЛАСИТЬ";
  const [buttonText, setButtonText] = useState(initialState);
  const changeText = (text) => {
    setButtonText(text);
    setTimeout(() => setButtonText(initialState), [1000])
  }
  return (
    <header className="header">
      <div className="header__logo__possion">
        <div className="header__logo"></div>
      </div>
      {(localStorage.userName || isAuthenticated) && (
        <>
          <button
            className="invite-button"
            onClick={() => {
              navigator.clipboard.writeText(window.location);
              changeText("СКОПИРОВАНО")
            }}
          >
            <div className="invite-button__text">{buttonText}</div>
          </button>
        </>
      )}
    </header>
  );
}
