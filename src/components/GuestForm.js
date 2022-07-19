import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { setUserName} from "../redux/features/authentication/authenticationSlice";
import { useState } from "react";

export default function GuestForm(props) {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const dispatch = useDispatch();


  function login() {
    dispatch(setUserName(name)); 
  /*   localStorage.userName = name; */
    navigate('/', { replace: true });
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
