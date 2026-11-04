import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getContactById, updateContact } from "../Api/contact";
import ContactForm from "../Components/ContactForm";

function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchContact = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getContactById(id);
        if (active) {
          setContact(data);
        }
      } catch (fetchError) {
        if (active) {
          setError(fetchError.message || "Failed to load contact.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchContact();
    return () => {
      active = false;
    };
  }, [id]);

  const handleUpdateContact = async (contactId, updatedContact) => {
    await updateContact(contactId, updatedContact);
    navigate(`/contact/${contactId}`);
  };

  if (loading) {
    return <p className="page-message">Loading contact...</p>;
  }

  if (error) {
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
      <ContactForm
        editingContact={contact}
        UpdateContact={handleUpdateContact}
        onCancelEdit={() => navigate(`/contact/${id}`)}
      />
    </main>
  );
}

export default EditContact;
