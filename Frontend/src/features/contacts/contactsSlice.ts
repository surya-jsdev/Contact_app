import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import {
  addContact as createContact,
  deleteContact as removeContact,
  getContacts,
  updateContact as saveContact,
  type Contact,
  type ContactInput,
} from "../../Api/contact";

interface ContactsState {
  items: Contact[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface ContactsRootState {
  contacts: ContactsState;
}

interface UpdateContactArgs {
  id: string;
  contact: ContactInput;
}

export const fetchContacts = createAsyncThunk<Contact[]>(
  "contacts/fetchContacts",
  async () => getContacts()
);

export const addContact = createAsyncThunk<Contact, ContactInput>(
  "contacts/addContact",
  async (contact) => createContact(contact)
);

export const updateContact = createAsyncThunk<Contact, UpdateContactArgs>(
  "contacts/updateContact",
  async ({ id, contact }) => saveContact(id, contact)
);

export const deleteContact = createAsyncThunk<string, string>(
  "contacts/deleteContact",
  async (id) => {
    await removeContact(id);
    return id;
  }
);

export const toggleFavourite = createAsyncThunk<Contact, Contact>(
  "contacts/toggleFavourite",
  async (contact) => {
    const id = contact.id || contact._id;
    if (!id) {
      throw new Error("Contact ID is missing");
    }
    const isFavourite = contact.isFavorite === true || contact.isFavorite === "true";
    return saveContact(id, { ...contact, isFavorite: !isFavourite });
  }
);

const initialState: ContactsState = {
  items: [],
  status: "idle",
  error: null,
};

const getContactId = (contact: Contact): string => String(contact.id || contact._id);
const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch contacts";
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const updatedId = getContactId(action.payload);
        state.items = state.items.map((contact) =>
          getContactId(contact) === updatedId ? action.payload : contact
        );
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (contact) => getContactId(contact) !== String(action.payload)
        );
        state.error = null;
      })
      .addCase(toggleFavourite.fulfilled, (state, action) => {
        const updatedId = getContactId(action.payload);
        state.items = state.items.map((contact) =>
          getContactId(contact) === updatedId ? action.payload : contact
        );
        state.error = null;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to add contact";
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to update contact";
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to delete contact";
      })
      .addCase(toggleFavourite.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to update favourite";
      });
  },
});

const selectContactsState = (state: ContactsRootState) => state.contacts;
export const selectContacts = createSelector(
  [selectContactsState],
  (contactsState) => contactsState.items
);

export const selectContactStatus = createSelector(
  [selectContactsState],
  (contactsState) => contactsState.status
);

export const selectContactError = createSelector(
  [selectContactsState],
  (contactsState) => contactsState.error
);

export const selectFavourites = createSelector([selectContacts], (contacts) =>
  contacts.filter(
    (contact) => contact.isFavorite === true || contact.isFavorite === "true"
  )
);

export const selectContactById = (state: ContactsRootState, id?: string) =>
  selectContacts(state).find(
    (contact) => String(contact.id || contact._id) === String(id)
  );

export const selectContactsBySearch = createSelector(
  [selectContacts, (_state: ContactsRootState, searchTerm: string) => searchTerm],
  (contacts, searchTerm) => {
    const search = String(searchTerm || "").trim().toLowerCase();
    if (!search) {
      return [];
    }

    return contacts.filter((contact) =>
      [contact.name, contact.phone || contact.Phone].some((value) =>
        String(value || "").toLowerCase().includes(search)
      )
    );
  }
);

export const contactsReducer = contactsSlice.reducer;
