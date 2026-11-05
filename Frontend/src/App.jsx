import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContactsProvider } from "./hooks/useContacts";
import { ToastProvider } from "./context/ToastContext";
import AddContact from "./pages/AddContact";
import ContactDetails from "./pages/ContactDetails";
import EditContact from "./pages/EditContact";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ToastProvider>
      <ContactsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddContact />} />
            <Route path="/contact/:id" element={<ContactDetails />} />
            <Route path="/edit/:id" element={<EditContact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ContactsProvider>
    </ToastProvider>
  );
}

export default App;
