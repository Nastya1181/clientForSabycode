import React, { useState } from "react";
import Meetings from "./Meetings";

export default function Log(props) {
    const [posts] = useState([
        {time:"12.03.21 14:30", prog: "Javascript", edited: "12.03.22 14:30", name: "Петров П,Иванов И "},
        {time:"12.03.23 14:30", prog: "C#", edited: "12.03.22 14:30", name: "Петров П,Иванов И"},
        {time:"12.03.22 14:30", prog: "Python", edited: "12.03.22 14:30", name: "Петров П,Иванов И"},
      ])
      return (
        <div className="app">
          <h1 className="log__name">Журнал</h1>
          <div className="table font__header">
                <div className="begin">Создано</div>
                <div className="named__lang">Язык</div>
                <div className="edit">Редактировано</div>
                <div className="family">Участники</div>
                <div className="delete">Удалить</div>
          </div>
          {posts.map(post =>
            <Meetings post ={post}/>)}  
        </div>
      );
}