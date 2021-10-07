import { useContext } from "react";

import { IoCarSportSharp } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";

import { StoreContext } from "../../store/StoreProvider";

const Header = () => {
  const { setSearchTerm, toggleEditSection, openEditSection } =
    useContext(StoreContext);
  return (
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
  );
};

export default Header;
