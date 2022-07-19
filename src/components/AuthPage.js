import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import {  selectUserName } from "../redux/features/authentication/authenticationSlice";
import GoogleAuth from "./GoogleAuth";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function AuthPage(props) {
  //Todo: сделать вход через сбис/регистрацию (Настя)

  return (
    <>
    <div className="auth">
      <div className="auth-header">Аутентификация</div>
      <GoogleAuth />
      <button className="auth-sbis">
        <div className="auth-sbis__logo"></div>
        <div className="auth-sbis__text">Авторизоваться через СБИС</div>
      </button>
      <div className="auth__line"><span>или<br/></span></div>
      <Link className="auth-guest" to="/guestLogin" 
        >
        <div className="auth-guest__text">Войти, как гость</div>
      </Link>
    </div>
    </>
  );
}
