import { useState } from 'react'
import Header from './Components/Header'
import ContactForm from './Components/ContactForm'
import Cards from './Components/Cards'
import Contacts from './data/db.js'


function App() {
  const [contacts, setContacts] = useState(() =>
    Contacts.map((contact) => ({
      ...contact,
      isFavorite:false
    }))
  )
  const [editingContact, setEditingContact] = useState(null)

  return (
  <>
  {/* Header Component */}
  <Header Data={contacts}/>

  <section className='Home'>
    {/* Contact Component */}
  <ContactForm
    key={editingContact?.id ?? 'new-contact'}
    AddContact={(contact) => setContacts((currentContacts) => [...currentContacts, contact])}
    editingContact={editingContact}
    UpdateContact={(updatedContact) => setContacts((currentContacts) =>
      currentContacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    )}
    onCancelEdit={() => setEditingContact(null)}
  />

  {/* Cards Component*/}
  <Cards
    Data={contacts}
    handleDelete={(id) => setContacts((currentContacts) => currentContacts.filter((contact) => contact.id !== id))}
    handleEdit={setEditingContact}
    handleToggleFavorite={(id) => setContacts((currentContacts) =>
      currentContacts.map((contact) =>
        contact.id === id
          ? { ...contact, isFavorite: !contact.isFavorite }
          : contact
      )
    )}
  />
  </section>
  </>
  )
}

export default App