import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "../Css/Table.css";

const Table = ({ userData, user }) => {
  const [data, setData] = useState([]);

  const handleSort = () => {
    const dataN = userData.sort((a, b) => b.Score - a.Score);
    setData(dataN);
  };

  const nameAndScore = userData.map((data, i) => {
    return (
      <tr
        key={uuidv4()}
        className={
          user && user.displayName === data.FirstName ? "user__register" : ""
        }
      >
        <td>{i + 1}</td>
        <td>{data.FirstName}</td>
        <td>{data.Score}</td>
      </tr>
    );
  });
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th style={{ display: "flex", justifyContent: "space-around" }}>
              Score
              <div className="icon__table" onClick={handleSort}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>{nameAndScore}</tbody>
      </table>
    </div>
  );
};

export default Table;
