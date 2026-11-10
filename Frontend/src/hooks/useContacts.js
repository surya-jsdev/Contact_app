import { useContext } from "react";
import ContactsContext from "../context/ContactsContext";

export function useContacts() {
  const context = useContext(ContactsContext);

  if (context === null) {
    throw new Error("useContacts must be used within a ContactsProvider");
  }

  return context;
}
