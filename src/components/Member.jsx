import React from "react";
function Member(props) {
    return (
      <div className="members">
          <div className="circle__user"></div>
          <div className="members__text">{props.name}</div>
      </div>
    );
  }

export default Member;