import React, { useEffect, useState } from "react";
import Card from "./Card";
import CreateAccountForm from "./CreateAccountForm";
import CreateAccountMsgForm from "./CreateAccountMsgForm";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase/useAuth";

//Only to use with UserContext thru the use of UserProvider
//import { useNewUserContext, useUserContext } from "../context/UserContext";

const CreateAccount = () => {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [user, setUser] = useState("");
  const [userMongo, setUserMongo] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("test");
      if (user) {
        console.log("User from FireBase ", user);
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
              header="Create Account"
              status={status}
              body={
                show ? (
                  <CreateAccountForm setShow={setShow} />
                ) : (
                  <CreateAccountMsgForm setShow={setShow} />
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

export default CreateAccount;
