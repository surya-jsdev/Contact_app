import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContact,
  selectContactById,
  selectContactError,
  selectContactStatus,
} from "../features/contacts/contactsSlice";

function ContactDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contact = useSelector((state) => selectContactById(state, id));
  const status = useSelector(selectContactStatus);
  const error = useSelector(selectContactError);
  const loading = status === "idle" || status === "loading";

  const handleDelete = async () => {
    try {
      await dispatch(deleteContact(contact.id ?? contact._id)).unwrap();
      navigate("/");
    } catch (deleteError) {
      console.error("Error deleting contact:", deleteError);
    }
  };

  if (loading) {
    return <p className="mx-auto my-8 grid w-[min(520px,calc(100%-32px))] justify-items-start gap-3">Loading contact...</p>;
  }

  if (error && !contact) {
    return (
      <main className="mx-auto my-8 grid w-[min(520px,calc(100%-32px))] justify-items-start gap-3" role="alert">
        <p>{error}</p>
      </main>
    );
  }

  if (!contact) {
    return (
      <main className="mx-auto my-8 grid w-[min(520px,calc(100%-32px))] justify-items-start gap-3">
        <p>Contact not found.</p>
       
      </main>
    );
  }

  return (
    <main className="mx-auto my-6 w-[500px]">
     
      <section className="rounded-xl border border-[#e0e7f1] bg-white p-[22px] shadow-[0_2px_8px_rgb(23_36_59_/_5%)]">
        <h1 className="mb-[18px] text-xl">Contact Details</h1>
        <dl className="grid gap-[14px]">
          <div>
            <dt className="text-[0.8rem] text-[#59677d]">Name</dt>
            <dd className="mt-[3px]">{contact.name}</dd>
          </div>
          <div>
            <dt className="text-[0.8rem] text-[#59677d]">Email</dt>
            <dd className="mt-[3px]">{contact.email || contact.Email || "Not provided"}</dd>
          </div>
          <div>
            <dt className="text-[0.8rem] text-[#59677d]">Phone</dt>
            <dd className="mt-[3px]">{contact.phone || contact.Phone || "Not provided"}</dd>
          </div>
          <div>
            <dt className="text-[0.8rem] text-[#59677d]">Group</dt>
            <dd className="mt-[3px]">{contact.group || contact.Group || "Not provided"}</dd>
          </div>
        </dl>
     
        {error && <p role="alert">{error}</p>}

        <div className="mt-[22px] flex gap-[10px]">
          <Link className="inline-flex min-h-[34px] items-center justify-center rounded-[5px] border-0 bg-[#2861e8] p-[6px] text-white no-underline" to={`/edit/${id}`}>
            Edit Contact
          </Link>
          <button
            className="inline-flex min-h-[34px] cursor-pointer items-center justify-center rounded-[5px] border-0 bg-[#c62828] p-[6px] text-white"
            type="button"
            onClick={handleDelete}
          >
            Delete Contact
          </button>
          <button className="inline-flex min-h-[34px] cursor-pointer items-center justify-center rounded-[5px] border-0 bg-[#2861e8] p-[6px] text-white">
             <Link to="/">Back to contacts</Link>
          </button>
        </div>
      </section>
    </main>
  );
}

export default ContactDetails;
