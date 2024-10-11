import { useId } from "react";
import css from "./SearchBox.module.css";

const SearchBox = ({ value, onChange }) => {
  const searchFieldId = useId();
  return (
    <div>
      <label className={css.label} htmlFor={searchFieldId}>
        Find contacts by name
        <input
          className={css.input}
          type="text"
          id={searchFieldId}
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default SearchBox;
