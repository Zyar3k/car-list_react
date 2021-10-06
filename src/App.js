import { useState } from "react";
import uuid from "react-uuid";
import "./App.scss";

import DBJSON from "./db.json";
import Header from "./components/Header/Header";
import Table from "./components/Table/Table";
import Form from "./components/Form/Form";

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
      <Header
        openEditSection={openEditSection}
        toggleEditSection={toggleEditSection}
        setSearchTerm={setSearchTerm}
      />
      <main>
        {openEditSection ? (
          <Form
            year={year}
            model={model}
            brand={brand}
            isEdit={isEdit}
            handleOnChangeModel={handleOnChangeModel}
            handleOnChangeBrand={handleOnChangeBrand}
            handleSubmit={handleSubmit}
            clearInputs={clearInputs}
            editCar={editCar}
            toggleEditSection={toggleEditSection}
            handleOnChangeYear={handleOnChangeYear}
          />
        ) : null}
        <Table
          sortByBrand={sortByBrand}
          sortByModel={sortByModel}
          sortByYear={sortByYear}
          cars={cars}
          searchTerm={searchTerm}
          handleCarEdit={handleCarEdit}
          deleteCar={deleteCar}
        />
      </main>
    </div>
  );
}

export default App;
