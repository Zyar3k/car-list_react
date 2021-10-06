import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Cars</h1>
        <button>Add new</button>
      </header>
      <main>
        <section>
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
            <button>Back</button>
          </form>
        </section>
        <section>
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
                <td>1</td>
                <td>Subaru</td>
                <td>Impreza</td>
                <td>1990</td>
                <td>
                  <span>
                    <button>EDIT</button>
                    <button>DELETE</button>
                  </span>
                </td>
              </tr>
              <tr>
                <td>2</td>
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
                <td>3</td>
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
