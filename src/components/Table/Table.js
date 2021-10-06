import { BsInputCursorText } from "react-icons/bs";

const Table = ({
  sortByBrand,
  sortByModel,
  sortByYear,
  cars,
  searchTerm,
  handleCarEdit,
  deleteCar,
}) => {
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
              <tr key={index} id={car.id}>
                <th>{index + 1}</th>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>
                  <span>
                    <button onClick={handleCarEdit}>EDIT</button>
                    <button onClick={deleteCar}>DELETE</button>
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {cars.length === 0 ? <h3>List is empty... Add some cars</h3> : null}
    </section>
  );
};

export default Table;
