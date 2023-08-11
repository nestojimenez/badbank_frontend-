import React, { useEffect, useState } from "react";
import Card from "./Card";

import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase/useAuth";

import LoginForm from "./LoginForm";
import LogInMsgForm from "./LogInMsgForm";

const Login = () => {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [user, setUser] = useState("");
  const [userMongo, setUserMongo] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("test");
      if (user) {
        console.log(user);
        setUser({ id: user.uid, email: user.email });
        setShow(false);
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

  return (
    <>
      <div className="container fluid">
        <div className="row mx-0 mt-3 p-0">
          <div className="col-3 m-0 p-0">
            <Card
              bgcolor="primary"
              header="Login"
              status={status}
              body={
                show ? (
                  <LoginForm setShow={setShow} />
                ) : (
                  <LogInMsgForm setShow={setShow} />
                )
              }
            ></Card>
          </div>
          <div className="col-6"></div>
          <div className="col-3 m-0 p-0">
            {!show && userMongo && <p className="text-end">User: {userMongo.name}</p>}
            {!show && userMongo && <p className="text-end">Email: {userMongo.email}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
