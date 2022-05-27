import { useState, useEffect, useRef, useCallback } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

import s from './phoneBook.module.css';

function PhoneBook() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  useEffect(() => {
    if (firstRender.current) {
      const data = localStorage.getItem('contacts');
      const res = JSON.parse(data);
      if (res?.length) {
        setContacts(res);
      }
      firstRender.current = false;
    }
  }, []);

  const addContacts = useCallback(
    data => {
      const isDuplicated = contacts.find(item => item.name === data.name);
      if (isDuplicated) {
        alert(`${data.name} is already in your Phonebook`);
        return;
      }

      //? add new  contact logic
      setContacts(prevContacts => {
        const { name, number } = data;
        const newContacts = {
          id: nanoid(),
          name,
          number,
        };
        return [...prevContacts, newContacts];
      });
    },
    [setContacts, contacts]
  );

  const changeFilter = useCallback(
    e => {
      setFilter(e.target.value);
    },
    [setFilter]
  );

  const deleteContacts = useCallback(
    id => {
      const res = contacts.filter(item => item.id !== id);
      setContacts(res);
    },
    [contacts, setContacts]
  );

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    const filterRequest = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name }) => {
      const res = name.toLowerCase().includes(filterRequest);
      return res;
    });

    return filteredContacts;
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm onSubmit={addContacts} />

      <h2 className={s.title}>Contacts</h2>

      <Filter onChange={changeFilter} filter={filter} />

      <ContactList
        contacts={getFilteredContacts()}
        deleteContacts={deleteContacts}
      />
    </div>
  );
}

export default PhoneBook;
