import { useState } from "react";
import "./App.scss";

function App() {
  const [isEditable, setIsEditable] = useState(false);
  return (
    <div className="App">
      <header>
        <section>
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
              <tr>
                <th>1</th>
                <td>Subaru</td>
                <td>Impreza</td>
                <td>1990</td>
                <td>
                  <span>
                    <button onClick={() => setIsEditable(true)}>EDIT</button>
                    <button>DELETE</button>
                  </span>
                </td>
              </tr>
              <tr>
                <th>2</th>
                <td>Mitsubishi</td>
                <td>Lancer</td>
                <td>1980</td>
                <td>
                  <span>
                    <button>EDIT</button>
                    <button>DELETE</button>
                  </span>
                </td>
              </tr>
              <tr>
                <th>3</th>
                <td>Audi</td>
                <td>80</td>
                <td>2000</td>
                <td>
                  <span>
                    <button>EDIT</button>
                    <button>DELETE</button>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default App;
