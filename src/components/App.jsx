import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import css from "./App.module.css";

import ContactForm from "./ContactForm/ContactForm";
import SearchBox from "./SearchBox/SearchBox";
import ContactList from "./ContactList/ContactList";

import initialContacts from "../data.json";

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem("state")) ?? initialContacts;
  });

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(contacts));
  }, [contacts]);

  const contactFormSubmitHandler = (data) => {
    const [name, number] = Object.values(data);
    contacts.some((contact) => {
      if (contact.name.toLowerCase() === name.toLowerCase()) {
        throw new Error(`Name "${name}" is already used in contacts`);
      }
      if (contact.number === number) {
        throw new Error(`Number ${number} is already saved in contacts`);
      }
    });

    const newContact = {
      ...data,
      id: nanoid(),
    };

    setContacts((prevState) => [newContact, ...prevState]);
  };

  const changeSearchValueHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const getFilteredContacts = () => {
    const normalizeSearch = searchValue.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizeSearch)
    );
  };

  const filteredContacts = getFilteredContacts();

  const deleteContactHandler = (id) => {
    setContacts((prevState) =>
      prevState.filter(
        (contact) =>
          contact.id !== id ||
          (contact.id === id &&
            iziToast.info({
              title: "Done",
              message: `${contact.name} was deleted from your contacts`,
            }))
      )
    );
  };

  return (
    <>
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={contactFormSubmitHandler} />
        {contacts.length > 1 && (
          <SearchBox value={searchValue} onChange={changeSearchValueHandler} />
        )}
        {contacts.length > 0 && <h2 className={css.subtitle}>Contacts</h2>}
        {contacts.length < 1 && (
          <p className={css.alterText}>
            There are no contacts in your contact list
          </p>
        )}
        {filteredContacts.length === 0 && searchValue !== "" && (
          <p className={css.alterText}>No contacts found</p>
        )}
        <ContactList
          contacts={filteredContacts}
          onDelete={deleteContactHandler}
        />
      </div>
    </>
  );
};

export default App;
