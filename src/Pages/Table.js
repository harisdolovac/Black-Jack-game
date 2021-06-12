import React, { useState, useEffect } from "react";
import fire from "../fire";

import "../Css/Table.css";

const Table = ({ userData }) => {
  const logOut = () => {
    fire.auth().signOut();
  };

  const userName = userData.map((item) => {
    return (
      <div key={item.id}>
        {console.log(item)}
        <td>{item.FirstName}</td>
      </div>
    );
  });
  const userScore = userData.map((item) => {
    return <td key={item.id}>{item.Score}</td>;
  });

  //console.log(userName);

  return (
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Score</th>
        </tr>
        <tr>
          <td>{userName}</td>
          <td>Email</td>
          <td style={{}} >{userScore}</td>
        </tr>
        <tr></tr>
        <tr>
          <td>Ernst Handel</td>
          <td>Roland Mendel</td>
          <td>Austria</td>
        </tr>
        <tr>
          <td>Island Trading</td>
          <td>Helen Bennett</td>
          <td>UK</td>
        </tr>
        <tr>
          <td>Laughing Bacchus Winecellars</td>
          <td>Yoshi Tannamuri</td>
          <td>Canada</td>
        </tr>
        <tr>
          <td>Magazzini Alimentari Riuniti</td>
          <td>Giovanni Rovelli</td>
          <td>Italy</td>
        </tr>
      </table>
    </div>
  );
};

export default Table;
