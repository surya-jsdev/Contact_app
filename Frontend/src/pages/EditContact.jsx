import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ContactForm from "../Components/ContactForm";
import {
  selectContactById,
  selectContactError,
  selectContactStatus,
} from "../features/contacts/contactsSlice";

function EditContact() {
  const { id } = useParams();
  const contact = useSelector((state) => selectContactById(state, id));
  const status = useSelector(selectContactStatus);
  const error = useSelector(selectContactError);
  const loading = status === "idle" || status === "loading";

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
