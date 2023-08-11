import React from 'react'

const CreateAccountMsgForm = (props) => {
    return (
        <>
          <h5>Success, please go to the action you will like to performe</h5>
          <button
            type="submit"
            className="btn btn-light"
            onClick={() => props.setShow(false)}
          >
           Your now logged On
          </button>
        </>
      );
}

export default CreateAccountMsgForm
