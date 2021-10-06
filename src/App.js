import { useState } from "react";
import uuid from "react-uuid";
import "./App.scss";
import { IoCarSportSharp } from "react-icons/io5";
import { BsSearch, BsInputCursorText } from "react-icons/bs";

import DBJSON from "./db.json";

function App() {
  const [openEditSection, setOpenEditSection] = useState(false);
  const [cars, setCars] = useState(DBJSON);
  const [searchTerm, setSearchTerm] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [id, setId] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [desc, setDesc] = useState(false);

  const handleOnChangeBrand = (event) => setBrand(event.target.value);
  const handleOnChangeModel = (event) => setModel(event.target.value);
  const handleOnChangeYear = (event) => setYear(event.target.value);

  const toggleEditSection = (e) => {
    const buttonAssignment = e.target.textContent.toLowerCase();
    console.log(buttonAssignment);
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

  const handleCarEdit = (e) => {
    toggleEditSection(e);
    const carEditId = e.target.parentNode.parentNode.parentNode.id;

    const carToEdit = cars.filter((item) => item.id === carEditId);
    setBrand(carToEdit[0].brand);
    setModel(carToEdit[0].model);
    setYear(carToEdit[0].year);
    setId(carToEdit[0].id);
  };

  const editCar = () => {
    let car = cars.filter((item) => item.id === id);

    const editCar = {
      brand: brand,
      model: model,
      year: year,
      id: id,
    };
    car = editCar;

    let array = cars.filter((item) => item.id !== id);
    clearInputs();
    setOpenEditSection(false);
    setIsEdit(false);
    setCars([...array, car]);
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

  // IMPROVE:
  const sortByBrand = () => {
    console.log("sortByBrand");
    let array;
    if (desc) {
      setDesc(!desc);
      array = [].concat(cars).sort((a, b) => (a.brand > b.brand ? 1 : -1));
    } else {
      setDesc(!desc);
      array = []
        .concat(cars)
        .sort((a, b) => (a.brand > b.brand ? 1 : -1))
        .reverse();
    }
    return setCars(array);
  };
  // IMPROVE:
  const sortByModel = () => {
    let array;

    if (desc) {
      setDesc(!desc);
      array = [].concat(cars).sort((a, b) => (a.model > b.model ? 1 : -1));
    } else {
      setDesc(!desc);
      array = []
        .concat(cars)
        .sort((a, b) => (a.model > b.model ? 1 : -1))
        .reverse();
    }
    return setCars(array);
  };
  // IMPROVE:
  const sortByYear = () => {
    let array;

    if (desc) {
      setDesc(!desc);
      array = [].concat(cars).sort((a, b) => (a.year > b.year ? 1 : -1));
    } else {
      setDesc(!desc);
      array = []
        .concat(cars)
        .sort((a, b) => (a.year > b.year ? 1 : -1))
        .reverse();
    }
    return setCars(array);
  };

  return (
    <div className="App">
      <header>
        <section>
          <div className="searchWrapper">
            <input
              type="text"
              placeholder="Search car..."
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <BsSearch />
          </div>
          <h1>
            <IoCarSportSharp />
            Cars
          </h1>
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
              {isEdit ? (
                <button type="button" onClick={editCar}>
                  Change
                </button>
              ) : (
                <button type="submit">Add</button>
              )}
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
      </main>
    </div>
  );
}

export default App;
