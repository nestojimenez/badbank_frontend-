import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase/useAuth";

const Balance = () => {
  //const users = useUserContext();

  const [data, setData] = useState("");
  const [user, setUser] = useState(null);
  const [mongoUser, setUserMongo] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.email);
        setUser({ id: user.uid, email: user.email });

        const url = `/account/transByEmail/${user.email}`;

        (async () => {
          let res = await fetch(url);
          let data = await res.json();
          console.log("Transaction: ", data);
          setData(data);
        })();

        getUserByEmail(user.email);
      } else {
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

  console.log(data);
  return (
    <div>
      {mongoUser && <h1>Account name: {mongoUser.name}</h1>}
      {mongoUser && <h2>Email: {mongoUser.email}</h2>}
      {mongoUser && <h3>Current Balance: {mongoUser.balance}</h3>}
      
      <div className="m-3">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-3">
                    <p>Name</p>
                  </div>
                  <div className="col-3">
                    <p>Email</p>
                  </div>
                  <div className="col-3">
                    <p>Amount</p>
                  </div>
                  <div className="col-3">
                    <p>Transaction Type</p>
                  </div>
                </div>
              </div>
            </div>
      {data &&
        data.map((item) => {
          return (
            <div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-3">
                    <p>{item.name}</p>
                  </div>
                  <div className="col-3">
                    <p>{item.email}</p>
                  </div>
                  <div className="col-3">
                    <p>{item.amount}</p>
                  </div>
                  <div className="col-3">
                    <p>{item.type}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Balance;
