import { selectAccessToken, selectUserName, setAccessToken, setUserName } from "../redux/features/authentication/authenticationSlice";
import { useDispatch, useSelector } from "react-redux/es/exports";
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../redux/api/sabycodeApi";
import LogOutButton from "./LogOutButton";
import LogButton from "./LogButton";
import CloseButton from "./CloseButton";
import Carousel from "./Carousel";
import Members from "./Members"
export default function Header() {
  const userName = useSelector(selectUserName);
  const initialState = "Пригласить";
  const [buttonText, setButtonText] = useState(initialState);
  const accessToken = useSelector(selectAccessToken);
  const changeText = (text) => {
    setButtonText(text);
    setTimeout(() => setButtonText(initialState), [1000])
  }
  const [post] = useState([
    {name:"Иван Иванов"},
    {name:"Даша Даревич"},
    {name:"Даша Даревич"},
    {name:"Даша Даревич"},
  ])
 
  return (
    <header className="header">
      <div className="header__logo__possion">
        <div className="header__logo"></div>
      </div>
      <Carousel show={3}>
        {post.map(post=>
          <Members post= {post}/>)}
      </Carousel>
      {userName && (
        <>
          <button
            className="invite-button"
            onClick={() => {
              navigator.clipboard.writeText(window.location);
              changeText("Скопировано")
            }}
          >
            <div className="invite-button__text">{buttonText}</div>
          </button>
        <LogOutButton />
        </>
      )}
      {/* {accessToken && <LogButton/>} */}
      {accessToken && <CloseButton/>}  
      {accessToken &&  <Link  className="event__log" to='/log'>Журнал событий</Link>}
    </header>
  );
}
