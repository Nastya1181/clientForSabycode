import React from "react";
import logo from '../img/delete.svg';
export default function Meetings(props) {
    return (
    <div>
        <div className="table">
          <div className="begin">{props.post.time}</div>
          <div className="named__lang">{props.post.prog}</div>
          <div className="edit">{props.post.edited}</div>
          <div className="family">{props.post.name}</div>
          <button className="delete__logo"><img src={logo} onClick={""} /></button>
        </div>
      </div>
    );
}
