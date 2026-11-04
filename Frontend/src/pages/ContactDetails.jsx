import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteContact, getContactById } from "../Api/contact";

function ContactDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

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

  }, [id]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      setError("");
      await deleteContact(id);
      navigate("/");
    } catch (deleteError) {
      setError(deleteError.message || "Failed to delete contact.");
      setDeleting(false);
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
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete Contact"}
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
