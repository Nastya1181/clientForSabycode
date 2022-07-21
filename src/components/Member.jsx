import React from "react";
function Member(props) {
    return (
      <>
      <div className="members__text">{props.name}</div>
      </>
    );
  }

export default Member;