import { Link } from "react-router-dom";

function Header({ Data }) {
  return (
    <header className="header">
      <Link to="/" className="header-title">
        <h2>Contact Book</h2>
      </Link>
      <p>{Data.length} Contacts</p>
      <Link to="/add" className="header-add">
        Add Contact
      </Link>
    </header>
  );
}

export default Header;
