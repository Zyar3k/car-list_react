import React from "react";

const Form = ({
  editCar,
  clearInputs,
  toggleEditSection,
  brand,
  model,
  year,
  isEdit,
  handleSubmit,
  handleOnChangeModel,
  handleOnChangeBrand,
  handleOnChangeYear,
}) => {
  return (
    <section className="formWrapper">
      <h3>{isEdit ? "Edit" : "Add"} new car</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Brand
          <input type="text" value={brand} onChange={handleOnChangeBrand} />
        </label>
        <label>
          Model
          <input type="text" value={model} onChange={handleOnChangeModel} />
        </label>
        <label>
          Year
          <input type="number" value={year} onChange={handleOnChangeYear} />
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
  );
};

export default Form;
