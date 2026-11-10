import { Link, useParams } from "react-router-dom";
import ContactForm from "../Components/ContactForm";
import { useContacts } from "../hooks/useContacts";

function EditContact() {
  const { id } = useParams();
  const { contacts, loading, error } = useContacts();
  const contact = contacts.find(
    (item) => String(item.id ?? item._id) === String(id)
  );

  if (loading) {
    return <p className="mx-auto my-8 grid w-[min(520px,calc(100%-32px))] justify-items-start gap-3">Loading contact...</p>;
  }

  if (error && !contact) {
    return (
      <main className="mx-auto my-8 grid w-[min(520px,calc(100%-32px))] justify-items-start gap-3" role="alert">
        <p>{error}</p>
        <Link to="/">Back to contacts</Link>
      </main>
    );
  }

  if (!contact) {
    return (
      <main className="mx-auto my-8 grid w-[min(520px,calc(100%-32px))] justify-items-start gap-3">
        <p>Contact not found.</p>
        <Link to="/">Back to contacts</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto my-6 w-[500px]">
      <Link className="mb-[14px] inline-block text-[#2455c7]" to={`/contact/${id}`}>Back to contact</Link>
      <ContactForm editingContact={contact} />
    </main>
  );
}

export default EditContact;
