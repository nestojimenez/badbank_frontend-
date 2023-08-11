import React from "react";

const WithdrawDepositMsg = (props) => {
  return (
    <div>
      <h5>Operation succed</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        New {props.type}
      </button>
    </div>
  );
};

export default WithdrawDepositMsg;
