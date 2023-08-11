import { onAuthStateChanged } from "firebase/auth";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import auth from "../firebase/useAuth";

const TransferForm = ({setShow}) => {
  const [userMongo, setUserMongo] = useState(null);
  const [user, setUser] = useState(null);

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

  const makeTransfer = (email, amount) =>{
    const urlx = `/account/getByEmail/${email}`;
    (async () => {
      let res = await fetch(urlx);
      let data = await res.json();
      console.log("Mi Data: ", data);

      let newBalance = Number(data.balance) + Number(amount);
      
      const urly = `/account/makeTransfer/${email}/${newBalance}`;
      let resy = await fetch(urly);
      let datay = await resy.json();
      console.log("Updated data ", datay);
    })();
  }

  let type = 'Transfer'
  const handleWithdrawsDeposits = (email, amount) => {
    const currentBalance = Number(userMongo.balance);
    const operationAmount = Number(amount);
    let newBalance = 0;
    if (type === "Transfer") {
      newBalance = currentBalance - operationAmount;
    } else if (type === "Deposit") {
      newBalance = currentBalance + operationAmount;
    }  else {
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

  const loadTransaction = (name, email, amount, type) => {
    const url = `/account/transaction/${name}/${email}/${amount}/${type}`;
    (async () => {
      let res = await fetch(url);
      let data = await res.json();
      console.log("Transaction: ", data);
    })();
  };

  const formik = useFormik({
    initialValues: {
      amount: "",
      password: "",
      email: "",
    },
    onSubmit: (values) => {
      console.log("form: ", values);
      handleWithdrawsDeposits(userMongo.email, values.amount);
      loadTransaction(userMongo.name, userMongo.email, values.amount, type)
      makeTransfer(values.email, values.amount);
    },
    validate: (values) => {
      let errors = {};

      if (values.amount < 0) errors.amount = "Positive amount is require";
      if (!values.amount) errors.amount = "Amount is require";
      if (values.amount > Number(userMongo.balance))
        errors.amount = "Balance exced";

      if (values.password !== userMongo.pasword)
        errors.password = "Not valid password";

      if (!values.email) errors.email = "Please Enter an email for Transfer";

      return errors;
    },
  });
  return (
    <div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          Enter Amount to Transfer
          <input
            type="number"
            name="amount"
            className="form-control m-1"
            placeholder={`Amount to Transfer`}
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
          Transfer Email
          <input
            type="text"
            name="email"
            className="form-control m-1"
            placeholder="Enter transfer email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email ? (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          ) : null}
          {userMongo && <p>Your curren balance is: {userMongo.balance}</p>}
          <button type="submit" className="btn btn-light m-2">
            Transfer
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransferForm;
