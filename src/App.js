import React, { Component } from 'react';
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'
import { Route } from 'react-router-dom'

class App extends Component {
  state = {
    contacts: [],
  };

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState(() => ({
        contacts
      }))
    })
  };

  removeContact = (contact) => {
    ContactsAPI.remove(contact).then((contact) => {
      this.setState((currentState) => ({
        contacts: currentState.contacts.filter(c => {
          return c.id !== contact.id
        })
      }))
    })
  }

  createContact = (contact) => {
    ContactsAPI.create(contact).then((contact) => {
      this.setState((currentState) => ({
        contacts: [...currentState.contacts, contact]
      }))
    })
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
          />
        )}/>
        <Route path='/create' render={({ history }) => (
          <CreateContact
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }} />
        )} />
      </div>
    );
  }
}

export default App;
