import React, { useState, useEffect } from "react";

import Table from "./Table";
import fire from "../fire";

const TableData = ({ amount }) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    var user = fire.auth().currentUser; //kupi korisnika

    if (user != null) {
      fire
        .database()
        .ref("UserInfo/" + user.uid)
        .set({
          FirstName: user.displayName,
          Score: amount,
        });
    } //setuje korisnika

    const readData = fire.database().ref("/UserInfo");
    readData.on("value", (snapshot) => {
      const data = snapshot.val();

      // console.log(data);
      for (const key in data) {
        setUserData((prevData) => [...prevData, data[key]]);
      }
    }); //cita iz baze
  }, [amount]);

  return (
    <div>
      <Table userData={userData} />
    </div>
  );
};

export default TableData;
