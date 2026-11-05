import { Link, useParams } from "react-router-dom";
import ContactForm from "../Components/ContactForm";
import { useContacts } from "../hooks/useContacts";

function EditContact() {
  const { id } = useParams();
  const { contacts, loading, error } = useContacts();
  const contact = contacts.find((item) => item.id || item._id === id);

  if (loading) {
    return <p className="page-message">Loading contact...</p>;
  }

  if (error && !contact) {
    return (
      <main className="page-message" role="alert">
        <p>{error}</p>
        <Link to="/">Back to contacts</Link>
      </main>
    );
  }

  if (!contact) {
    return (
      <main className="page-message">
        <p>Contact not found.</p>
        <Link to="/">Back to contacts</Link>
      </main>
    );
  }

  return (
    <main className="form-page">
      <Link to={`/contact/${id}`}>Back to contact</Link>
      <ContactForm editingContact={contact} />
    </main>
  );
}

export default EditContact;
