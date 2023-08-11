import React from "react";

const Card = ({ header, title, text, body, status, bgcolor, txtcolor }) => {
  /*const classes = () => {
    const bg = bgcolor ? " bg-" + bgcolor : " ";
    const txt = txtcolor ? " text-" + txtcolor : " text-white";
    return "card mb-3 " + bg + txt;
  };*/

  return (
    <div>
      <div className="card text-white bg-primary mb-3" style={{maxWidth: '18rem'}}>
        <div className="card-header text-dark">{header}</div>
        <div className="card-body">
          {title && <h5 className="card-title"></h5>}
          {text && <p className="card-text">{text}</p>}
          {body}
          {status && <div id="createStatus">{status}</div>}
        </div>
      </div>
    </div>
  );
};

export default Card;
