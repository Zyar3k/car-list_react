import { useState } from "react";
import uuid from "react-uuid";
import "./App.scss";

import DBJSON from "./db.json";

function App() {
  const [openEditSection, setOpenEditSection] = useState(false);
  const [cars, setCars] = useState(DBJSON);
  const [searchTerm, setSearchTerm] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const handleOnChangeBrand = (event) => setBrand(event.target.value);
  const handleOnChangeModel = (event) => setModel(event.target.value);
  const handleOnChangeYear = (event) => setYear(event.target.value);

  const toggleEditSection = (e) => {
    const buttonAssignment = e.target.textContent.toLowerCase();
    if (buttonAssignment === "add new") {
      setOpenEditSection(true);
      setIsEdit(false);
    } else if (buttonAssignment === "back") {
      setOpenEditSection(false);
      setIsEdit(false);
    } else if (buttonAssignment === "edit") {
      setOpenEditSection(true);
      setIsEdit(true);
    } else if (buttonAssignment === "add") {
      setOpenEditSection(false);
    }
  };

  const deleteCar = (e) => {
    const id = e.target.parentNode.parentNode.parentNode.id;
    const array = cars.filter((car) => car.id !== id);
    setCars(array);
  };

  const editCar = (e) => {
    toggleEditSection(e);
  };

  const clearInputs = () => {
    setBrand("");
    setModel("");
    setYear("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = uuid();

    const newCar = {
      id: newId,
      brand: brand,
      model: model,
      year: year,
    };

    const data = [...cars, newCar];
    setOpenEditSection(false);
    clearInputs();
    setCars(data);
  };

  return (
    <div className="App">
      <header>
        <section>
          <input
            type="text"
            placeholder="Search car..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <h1>Cars</h1>
          <button onClick={(e) => toggleEditSection(e)}>
            {!openEditSection ? "Add new" : "Back"}
          </button>
        </section>
      </header>
      <main>
        {openEditSection ? (
          <section className="formWrapper">
            <h3>{isEdit ? "Edit" : "Add"} new car</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Brand
                <input
                  type="text"
                  placeholder="brand"
                  value={brand}
                  onChange={handleOnChangeBrand}
                />
              </label>
              <label>
                Model
                <input
                  type="text"
                  placeholder="model"
                  value={model}
                  onChange={handleOnChangeModel}
                />
              </label>
              <label>
                Year
                <input
                  type="number"
                  placeholder="year"
                  value={year}
                  onChange={handleOnChangeYear}
                />
              </label>
              <button type="submit">{isEdit ? "Edit" : "Add"}</button>
              <button type="button" onClick={clearInputs}>
                Clear
              </button>
              <button type="button" onClick={(e) => toggleEditSection(e)}>
                Back
              </button>
            </form>
          </section>
        ) : null}
        <section className="tableWrapper">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Year</th>
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
                        <button onClick={editCar}>EDIT</button>
                        <button onClick={deleteCar}>DELETE</button>
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default App;
