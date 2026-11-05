import { Link, useNavigate, useParams } from "react-router-dom";
import { useContacts } from "../hooks/useContacts";

function ContactDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contacts, loading, error, deleteContact } = useContacts();
  const contact = contacts.find(
    (item) => String(item.id || item._id) === String(id)
  );

  const handleDelete = async () => {
    try {
      await deleteContact(contact.id || contact._id);
      navigate("/");
    } catch (deleteError) {
      console.error("Error deleting contact:", deleteError);
    }
  };

  if (loading) {
    return <p className="page-message">Loading contact...</p>;
  }

  if (error && !contact) {
    return (
      <main className="page-message" role="alert">
        <p>{error}</p>
      </main>
    );
  }

  if (!contact) {
    return (
      <main className="page-message">
        <p>Contact not found.</p>
       
      </main>
    );
  }

  return (
    <main className="contact-details-page">
     
      <section className="contact-details-card">
        <h1>Contact Details</h1>
        <dl>
          <div>
            <dt>Name</dt>
            <dd>{contact.name}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{contact.email || contact.Email || "Not provided"}</dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>{contact.phone || contact.Phone || "Not provided"}</dd>
          </div>
          <div>
            <dt>Group</dt>
            <dd>{contact.group || contact.Group || "Not provided"}</dd>
          </div>
        </dl>
     
        {error && <p role="alert">{error}</p>}

        <div className="details-actions">
          <Link className="btn" to={`/edit/${id}`}>
            Edit Contact
          </Link>
          <button
            className="btn delete-button"
            type="button"
            onClick={handleDelete}
          >
            Delete Contact
          </button>
          <button>
             <Link to="/">Back to contacts</Link>
          </button>
        </div>
      </section>
    </main>
  );
}

export default ContactDetails;
