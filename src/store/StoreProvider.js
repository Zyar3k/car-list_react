import { createContext, useEffect, useState } from "react";
import uuid from "react-uuid";
import DBJSON from "../db.json";

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [cars, setCars] = useState([DBJSON]);
  console.log(cars.length);
  const [openEditSection, setOpenEditSection] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [id, setId] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [desc, setDesc] = useState(false);

  const deleteCar = (e) => {
    const id = e.target.parentNode.parentNode.parentNode.id;
    const array = cars.filter((car) => car.id !== id);
    setCars(array);
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

  const handleOnChangeBrand = (event) => {
    setBrand(event.target.value);
  };
  const handleOnChangeModel = (event) => {
    setModel(event.target.value);
  };

  const handleOnChangeYear = (event) => {
    setYear(event.target.value);
  };

  const toggleEditSection = (e) => {
    const buttonAssignment = e.target.textContent.toLowerCase();

    if (buttonAssignment === "add new") {
      clearInputs();
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

  const clearInputs = () => {
    setBrand("");
    setModel("");
    setYear("");
  };

  useEffect(() => {
    setCars(DBJSON);
  }, []);

  return (
    <StoreContext.Provider
      value={{
        cars,
        setCars,
        id,
        setId,
        brand,
        setBrand,
        model,
        setModel,
        year,
        setYear,
        desc,
        setDesc,
        isEdit,
        setIsEdit,
        openEditSection,
        setOpenEditSection,
        searchTerm,
        setSearchTerm,
        clearInputs,
        deleteCar,
        editCar,
        handleOnChangeModel,
        handleOnChangeBrand,
        handleSubmit,
        handleOnChangeYear,
        handleCarEdit,
        sortByBrand,
        sortByModel,
        sortByYear,
        toggleEditSection,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
