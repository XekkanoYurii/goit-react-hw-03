import css from "./Contact.module.css";
const Contact = ({ name, number, id, onDelete }) => {
  return (
    <li className={css.listItem}>
      <p>
        {name}: {number}
      </p>
      <button
        className={css.deleteButton}
        type="button"
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </li>
  );
};

export default Contact;
