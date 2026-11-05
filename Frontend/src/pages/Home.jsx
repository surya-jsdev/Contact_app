import { useContacts } from "../hooks/useContacts";
import ConatactCard from "../Components/ConatactCard";
import Header from "../Components/Header";
import SearchBar from "../Components/SearchBar";

function Home() {

  const { contacts, loading, error } = useContacts();

  const favoriteContacts = contacts.filter(
    (contact) =>
      contact.isFavorite === true ||
      contact.isFavorite === "true"
  );

  return (
    <>
      <Header Data={contacts} />

      <main className="Home home-page">
        <section className="contact-list">

          <SearchBar contacts={contacts} />

          {error && <p role="alert">{error}</p>}
          {loading && <p>Loading contacts...</p>}

          {/* Favourites */}
          {!loading && favoriteContacts.length > 0 && (
            <section className="favorite-section">
              <h2>
                <i className="fa-solid fa-star"></i>
                Favourites
              </h2>

              <ConatactCard favoritesOnly />
            </section>
          )}

          {/* Other Contacts */}
          {!loading && <section className="all-contacts">
            <h2>All contacts</h2>

            <ConatactCard />
          </section>}

        </section>
      </main>
    </>
  );
}

export default Home;