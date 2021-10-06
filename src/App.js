import { useState } from "react";
import "./App.scss";

import DBJSON from "./db.json";

function App() {
  const [isEditable, setIsEditable] = useState(false);
  const [cars, setCars] = useState(DBJSON);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="App">
      <header>
        <section>
          <input
            type="text"
            placeholder="search"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <h1>Cars</h1>
          <button onClick={() => setIsEditable(!isEditable)}>
            {!isEditable ? "Add new" : "Back"}
          </button>
        </section>
      </header>
      <main>
        {isEditable ? (
          <section className="formWrapper">
            <h3>Add new car</h3>
            <form>
              <label>
                Brand
                <input type="text" />
              </label>
              <label>
                Model
                <input type="text" />
              </label>
              <label>
                Year
                <input type="number" />
              </label>
              <button>Add</button>
              <button onClick={() => setIsEditable(!isEditable)}>Back</button>
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
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{car.brand}</td>
                    <td>{car.model}</td>
                    <td>{car.year}</td>
                    <td>
                      <span>
                        <button onClick={() => setIsEditable(true)}>
                          EDIT
                        </button>
                        <button>DELETE</button>
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
