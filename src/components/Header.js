import { selectAccessToken, selectCurrentUsers, selectUserName } from "../redux/features/authentication/authenticationSlice";
import { useSelector } from "react-redux/es/exports";
import React, {  useState } from "react"
import { Link } from "react-router-dom";
import LogOutButton from "./LogOutButton";
import CloseButton from "./CloseButton";
import Carousel from "./Carousel";
import Member from "./Member"

export default function Header() {
  const userName = useSelector(selectUserName);
  const initialState = "Пригласить";
  const [buttonText, setButtonText] = useState(initialState);
  const accessToken = useSelector(selectAccessToken);
  const changeText = (text) => {
    setButtonText(text);
    setTimeout(() => setButtonText(initialState), [1000])
  }

  const currentUsers = useSelector(selectCurrentUsers);
 
  return (
    <header className="header">
      <div className="header__logo__possion">
        <div className="header__logo"></div>
      </div>
      {userName && <Carousel show={3}>
        {currentUsers?.map(user =>
          <Member name={user} key={user}/>)}
      </Carousel>}
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
