import React from "react";
import logo from '../img/delete.svg';
import { useRemoveConnectionMutation } from "../redux/api/sabycodeApi";
export default function Meeting(props) {
  const [removeConnection, {}] = useRemoveConnectionMutation();
    return (
    <div>
        <tr id={props.id} className="table">
        <td className="begin">{props.time}</td>
            <td className="edit">{props.edited}</td>
            <td className="named__lang font-weight">{props.prog}</td>
            <td className="family">{props.name}</td>
          <button className="delete__button"><div className="delete__inside"><img className="delete__logo" src={logo} onClick={async (event) => {console.log(event.target.parentNode.parentNode);await removeConnection({stat: event.target.parentNode.parentNode.id}).unwrap()}} /><span className="delete__meeting">Удалить</span></div></button>
        </tr>
      </div>
    );
}
