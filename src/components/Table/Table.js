import { useContext } from "react";

import { BsInputCursorText } from "react-icons/bs";
import TableItem from "./TableItem/TableItem";

import { StoreContext } from "../../store/StoreProvider";

const Table = () => {
  const {
    cars,
    deleteCar,
    searchTerm,
    sortByBrand,
    sortByModel,
    sortByYear,
    handleCarEdit,
  } = useContext(StoreContext);

  return (
    <section className="tableWrapper">
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>
              Brand
              <span onClick={sortByBrand}>
                <BsInputCursorText />
              </span>
            </th>
            <th>
              Model
              <span onClick={sortByModel}>
                <BsInputCursorText />
              </span>
            </th>
            <th>
              Year
              <span onClick={sortByYear}>
                <BsInputCursorText />
              </span>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cars
            .filter((car) => {
              if (searchTerm === "") {
                return car;
              } else if (
                car.brand
                  .toLocaleLowerCase()
                  .includes(searchTerm.toLocaleLowerCase())
              ) {
                return car;
              }
            })

            .map((car, index) => (
              <TableItem
                key={index}
                deleteCar={deleteCar}
                index={index}
                car={car}
                handleCarEdit={handleCarEdit}
              />
            ))}
        </tbody>
      </table>
      {cars.length === 0 ? <h3>List is empty... Add some cars</h3> : null}
    </section>
  );
};

export default Table;
