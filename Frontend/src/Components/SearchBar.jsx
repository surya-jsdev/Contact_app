import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

function SearchBar({ contacts }) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search.trim().toLowerCase(), 400);
  const searchValue = debouncedSearch
    ? contacts.filter(
        (contact) =>
        String(contact.name ?? "").toLowerCase().includes(debouncedSearch) ||
        String(contact.phone ?? contact.Phone ?? "")
            .toLowerCase()
            .includes(debouncedSearch)
      )
    : [];

  return (
    <div className="relative">
      <div className="flex min-h-[34px] items-center gap-[9px] rounded-lg border border-[#d6deeb] bg-white px-3 text-[#78859a]">
        <span><Search size={16} /></span>
        <input
          className="w-full border-0 bg-transparent text-[#17243b] outline-0 placeholder:text-[14px] placeholder:text-[#8a95a6]"
          type="search"
          placeholder="Search by name or phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {search && (
        <div className="absolute inset-x-0 z-[1] max-h-60 overflow-y-auto rounded-lg border border-[#d6deeb] bg-white shadow-[0_4px_12px_rgb(23_36_59_/_12%)]">
          {searchValue.length > 0 ? (
            searchValue.map((contact) => (
              <Link
                className="block border-b border-[#edf0f5] px-3 py-[9px] text-inherit no-underline last:border-b-0 hover:bg-[#f3f6fb]"
                key={contact.id || contact._id}
                to={`/contact/${contact.id ?? contact._id}`}
              >
                <h3 className="text-sm">{contact.name}</h3>
                <p className="mt-[3px] text-xs text-[#59677d]">{contact.phone || contact.Phone}</p>
              </Link>
            ))
          ) : (
            <p className="block border-b border-[#edf0f5] px-3 py-[9px] text-inherit last:border-b-0">No contacts found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;