import { useContext } from "react";

import "./App.scss";

import Header from "./components/Header/Header";
import Table from "./components/Table/Table";
import Form from "./components/Form/Form";

import { StoreContext } from "./store/StoreProvider";

function App() {
  const { openEditSection } = useContext(StoreContext);

  return (
    <div className="App">
      <Header />
      <main>
        {openEditSection ? <Form /> : null}
        <Table />
      </main>
    </div>
  );
}

export default App;
