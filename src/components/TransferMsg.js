import React from 'react'

const TransferMsg = ({setShow}) => {
  return (
    <div>
      <>
          <h5>Your now logged In</h5>
          <button
            type="submit"
            className="btn btn-light"
            onClick={()=>setShow(true) }
          >
            New Transfer
          </button>
        </>
    </div>
  )
}

export default TransferMsg
