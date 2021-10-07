import React from "react";

const TableItem = ({ car, index, deleteCar, handleCarEdit }) => {
  const { id, brand, model, year } = car;
  return (
    <tr id={id}>
      <th>{index + 1}</th>
      <td>{brand}</td>
      <td>{model}</td>
      <td>{year}</td>
      <td>
        <span>
          <button onClick={handleCarEdit}>EDIT</button>
          <button onClick={deleteCar}>DELETE</button>
        </span>
      </td>
    </tr>
  );
};

export default TableItem;
