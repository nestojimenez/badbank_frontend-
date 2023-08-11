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
    <div className="m-5 p-5">
      {mongoUser && <h1>Account name: {mongoUser.name}</h1>}
      {mongoUser && <h2>Email: {mongoUser.email}</h2>}
      {mongoUser && <h3>Current Balance: {mongoUser.balance}</h3>}

      

      <table className="table table-striped m-5 p-5">
        <thead>
          <tr>
          <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Amount</th>
            <th scope="col">Transaction Type</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((item, index)=>{
            return(
              
                <tr key={index}>
                  <th scope="row">{index+1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.amount}</td>
                  <td>{item.type}</td>
                </tr>
              
            )
          })}
       </tbody>
      </table>
    </div>
  );
};

export default Balance;
