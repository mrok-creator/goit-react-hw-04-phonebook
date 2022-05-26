import { Component } from 'react';

import s from './contactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={s.box} onSubmit={this.handleSubmit}>
        <label htmlFor="name" className={s.text}>
          Contact's Name
        </label>
        <input
          value={name}
          type="text"
          name="name"
          id="name"
          placeholder="Enter Name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={this.handleChange}
          className={s.input}
        />
        <label htmlFor="tel" className={s.text}>
          Contact's Number
        </label>
        <input
          value={number}
          type="tel"
          name="number"
          id="tel"
          placeholder="Enter Number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={this.handleChange}
          className={s.input}
        />

        <button type="submit" className={s.btn}>
          Add Contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
