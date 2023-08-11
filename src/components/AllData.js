import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase/useAuth";

const AllData = () => {
  //const users = useUserContext();

  const [data, setData] = useState("");
  const [user, setUser] = useState(null);

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

      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  console.log(data);
  return (
    <div>
      {data && <p>{JSON.stringify(data)}</p>}
      
    </div>
  );
};

export default AllData;
