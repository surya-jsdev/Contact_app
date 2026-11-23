import { Link } from "react-router-dom";
import ContactForm from "../Components/ContactForm";
import { ArrowLeft } from "lucide-react";

function AddContact() {
  return (
    <main className="flex h-dvh items-center justify-center rounded-xl border border-[#e0e7f1] bg-white p-[18px_16px] shadow-[0_2px_8px_rgb(23_36_59_/_5%)]">
      <section className="mx-auto my-6 w-[500px]">
        <button className="mb-[14px] inline-flex min-h-[34px] items-center justify-center rounded-[5px] border-0 bg-[#2861e8] p-1 text-[#2455c7]">
          <Link to="/" className="mt-px flex text-white no-underline">
          <ArrowLeft size={18} style={{marginRight:'4px'}}/>Back to contacts
          </Link>
        </button>
        {/* ConatctForm Component */}
        <ContactForm />
      </section>
    </main>
  );
}

export default AddContact;
