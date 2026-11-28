import { Link } from "react-router-dom";
import ContactForm from "../Components/ContactForm";
import { ArrowLeft } from "lucide-react";

function AddContact() {
  return (
    <main className="flex min-h-dvh items-start justify-center px-4 py-6">
      <section className="mx-auto w-full max-w-125 ">
        <Link
          to="/"
          className="mb-3.5 inline-flex min-h-8.5 items-center justify-center gap-1 rounded-[5px] bg-[#2861e8] px-2 py-1.5 text-white no-underline"
        >
          <ArrowLeft size={18} />Back to contacts
        </Link>
        {/* ConatctForm Component */}
        <ContactForm />
      </section>
    </main>
  );
}

export default AddContact;
