import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { setIsAuthenticated } from "../redux/features/authentication/authenticationSlice";
import { useState } from "react";


export default function GuestForm(props) {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const dispatch = useDispatch();

  function login() {
    localStorage.userName = name;
    dispatch(setIsAuthenticated(true)); //нужно для перерисовки Header, можно ли как-то обойтись localStorage?
    navigate(`/${localStorage.sessionId}`);
  }

  return (
    <>
    <div className="input__content">
      <h1 className="input__text">Пожалуйста, представьтесь</h1>
      <input className="guest__input"
        placeholder="Ваше имя"
        onChange={(event) => {
          setName(event.target.value);
        }}
      ></input>
      <button className="login-button" onClick={login}>
        войти
      </button>
      </div>
    </>
  );
}
