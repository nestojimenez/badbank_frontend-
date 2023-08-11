import React, { useEffect, useState } from "react";

import Card from "./Card";

import TransferForm from "./TransferForm";
import TransferMsg from "./TransferMsg";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase/useAuth";

const Transfer = () => {
  const [show, setShow] = useState(true);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("");
  const [userMongo, setUserMongo] = useState(null);

  const getUserByEmail = (email) => {
    const url = `/account/getByEmail/${email}`;
    (async () => {
      let res = await fetch(url);
      let data = await res.json();
      console.log("Mi Data: ", data);
      setUserMongo(data);
    })();
  };

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

  return (
    <>
      <div className="container fluid">
        <div className="row mx-0 mt-3 p-0">
          <div className="col-3 m-0 p-0">
            <Card
              bgcolor="primary"
              header="Transfer"
              status={status}
              body={
                show ? (
                  <TransferForm setShow={setShow} />
                ) : (
                  <TransferMsg setShow={setShow} />
                )
              }
            ></Card>
          </div>
          <div className="col-6"></div>
          <div className="col-3 m-0 p-0">
            {userMongo && <p className="text-end">User: {userMongo.name}</p>}
            {userMongo && <p className="text-end">Email: {userMongo.email}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Transfer;
