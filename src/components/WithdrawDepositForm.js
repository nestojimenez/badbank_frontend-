import { useFormik } from "formik";
import React, { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase/useAuth";

const WithdrawDepositForm = ({ setShow, type }) => {
  const [user, setUser] = useState(null);
  const [userMongo, setUserMongo] = useState(null);
 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("test");
      if (user) {
        console.log(user);
        setUser({ id: user.uid, email: user.email });
        getUserByEmail(user.email);
      } else {
        console.log("null");
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const getUserByEmail = (email) => {
    const url = `/account/getByEmail/${email}`;
    (async () => {
      let res = await fetch(url);
      let data = await res.json();
      console.log("Mi Data: ", data);
      setUserMongo(data);
    })();
  };

  const loadTransaction = (name, email, amount, type) => {
    const url = `/account/transaction/${name}/${email}/${amount}/${type}`;
    (async () => {
      let res = await fetch(url);
      let data = await res.json();
      console.log("Transaction: ", data);
    })();
  };

  const handleWithdrawsDeposits = (email, amount) => {
    const currentBalance = Number(userMongo.balance);
    const operationAmount = Number(amount);
    let newBalance = 0;
    if (type === "Withdraw") {
      newBalance = currentBalance - operationAmount;
    } else if (type === "Deposit") {
      newBalance = currentBalance + operationAmount;
    }else if (type === "Transfer") {
      newBalance = currentBalance - operationAmount;
    } else {
      newBalance = currentBalance;
    }

    console.log("New Balance ", newBalance);
    console.log("Email ", email);

    const url = `/account/updateBalance/${email}/${newBalance}`;

    (async () => {
      let res = await fetch(url);
      let data = await res.json();
      console.log("Updated data ", data);
    })();

    setShow(false);
  };

  

  const formik = useFormik({
    initialValues: {
      amount: "",
      password: ""
    },
    onSubmit: (values) => {
      console.log("form: ", values);
      handleWithdrawsDeposits(userMongo.email, values.amount);
      loadTransaction(userMongo.name, userMongo.email, values.amount, type);
      
     

    },
    validate: (values) => {
      let errors = {};

      if (values.amount < 0) errors.amount = "Positive amount is require";
      if (!values.amount) errors.amount = "Amount is require";
      if (type === "Withdraw" && values.amount > Number(userMongo.balance))
        errors.amount = "Balance exced";

      if (values.password !== userMongo.pasword)
        errors.password = "Not valid password";

      return errors;
    },
  });

  return (
    <div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          Enter Amount to {type}
          <input
            type="number"
            name="amount"
            className="form-control m-1"
            placeholder={`Amount to ${type}`}
            value={formik.values.amount}
            onChange={formik.handleChange}
          />
          {formik.errors.amount ? (
            <div style={{ color: "red" }}>{formik.errors.amount}</div>
          ) : null}
          Password
          <input
            type="password"
            name="password"
            className="form-control m-1"
            placeholder="Enter password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password ? (
            <div style={{ color: "red" }}>{formik.errors.password}</div>
          ) : null}
          {userMongo && <p>Your curren balance is: {userMongo.balance}</p>}
          
          <button type="submit" className="btn btn-light m-2">
            {type}
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default WithdrawDepositForm;
