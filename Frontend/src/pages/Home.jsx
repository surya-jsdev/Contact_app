import { useSelector } from "react-redux";
import ConatactCard from "../Components/ConatactCard";
import Header from "../Components/Header";
import SearchBar from "../Components/SearchBar";
import {
  selectContactError,
  selectContactStatus,
  selectContacts,
  selectFavourites,
} from "../features/contacts/contactsSlice";

function Home() {
  const contacts = useSelector(selectContacts);
  const favoriteContacts = useSelector(selectFavourites);
  const status = useSelector(selectContactStatus);
  const error = useSelector(selectContactError);
  const loading = status === "idle" || status === "loading";

  return (
    <>
      <Header Data={contacts} />

      <main className="mx-auto my-5 flex w-[min(1216px,calc(100%-48px))] justify-center gap-5.5 max-[700px]:w-[min(520px,calc(100%-32px))] max-[480px]:my-4">
        <section className="flex w-[700px] flex-col gap-[18px]">

          <SearchBar />

          {error && <p role="alert">{error}</p>}
          {loading && <p>Loading contacts...</p>}

          {/* Favourites */}
          {!loading && favoriteContacts.length > 0 && (
            <section className="flex flex-col gap-[10px]">
              <h2 className="text-sm">
                <i className="fa-solid fa-star text-[#ffbb00]"></i>
                Favourites
              </h2>

              <ConatactCard favoritesOnly />
            </section>
          )}

          {/* Other Contacts */}
          {!loading && <section className="flex flex-col gap-[10px]">
            <h2 className="text-sm">All contacts</h2>

            <ConatactCard />
          </section>}

        </section>
      </main>
    </>
  );
}

export default Home;