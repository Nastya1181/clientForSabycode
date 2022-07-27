import React from "react";
import logo from '../img/delete.svg';
import { useRemoveConnectionMutation } from "../redux/api/sabycodeApi";
export default function Meeting(props) {
  const [removeConnection, {}] = useRemoveConnectionMutation();
    return (
        <tbody id={props.id} className="container"><tr>
        <td className="begin">{props.post.time}</td>
            <td className="edit">{props.post.edited}</td>
            <td className="named__lang font-weight">{props.post.prog}</td>
            <td className="family">{props.post.name}</td>
          <td><button className="delete__button"><div className="delete__inside"><img className="delete__logo" src={logo} onClick={async (event) => {console.log(event.target.parentNode.parentNode);await removeConnection({stat: event.target.parentNode.parentNode.id}).unwrap()}} /><span className="delete__meeting">Удалить</span></div></button></td></tr>
        </tbody>
    );
}
