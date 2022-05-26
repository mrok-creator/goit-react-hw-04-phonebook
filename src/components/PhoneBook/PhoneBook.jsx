import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

import s from './phoneBook.module.css';

class PhoneBook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const data = localStorage.getItem('contacts');
    const contacts = JSON.parse(data);

    if (contacts?.length) {
      this.setState({
        contacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  // ? add contacts to state with input value
  addContacts = data => {
    // error due to duplicated contacts
    const { contacts } = this.state;
    const isDuplicated = contacts.find(item => item.name === data.name);
    if (isDuplicated) {
      alert(`${data.name} is already in your Phonebook`);
      return;
    }

    //? add new  contact logic
    this.setState(prevState => {
      const { contacts } = prevState;
      const { name, number } = data;
      const newContacts = {
        id: nanoid(),
        name,
        number,
      };
      return {
        contacts: [...contacts, newContacts],
        name: ' ',
        number: ' ',
      };
    });
  };

  //? change state due to user action
  changeFilter = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  //? returned contacts to render
  getFilteredContacts() {
    const { contacts, filter } = this.state;
    if (!filter) {
      return contacts;
    }

    const filterRequest = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name }) => {
      const res = name.toLowerCase().includes(filterRequest);
      return res;
    });

    return filteredContacts;
  }

  //? delete contacts from state
  deleteContacts = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(item => item.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <div className={s.container}>
        <h1 className={s.title}>Phonebook</h1>
        <ContactForm onSubmit={this.addContacts} />

        <h2 className={s.title}>Contacts</h2>

        <Filter onChange={this.changeFilter} filter={filter} />

        <ContactList
          contacts={filteredContacts}
          deleteContacts={this.deleteContacts}
        />
      </div>
    );
  }
}

export default PhoneBook;
