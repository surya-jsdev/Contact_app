import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import {
  addContact as createContact,
  deleteContact as removeContact,
  getContacts,
  updateContact as saveContact,
} from "../../Api/contact";


// createAsyncThunk
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => getContacts()
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact) => createContact(contact)
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ id, contact }) => saveContact(id, contact)
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id) => {
    await removeContact(id);
    return id;
  }
);

export const toggleFavourite = createAsyncThunk(
  "contacts/toggleFavourite",
  async (contact) => {
    const id = contact.id || contact._id;
    const isFavourite = contact.isFavorite === true || contact.isFavorite === "true";
    return saveContact(id, { ...contact, isFavorite: !isFavourite });
  }
);


// Slice Creation
const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const getContactId = (contact) => String(contact.id || contact._id);

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
        state.error = action.error.message;
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
      .addMatcher(
        (action) =>
          [addContact, updateContact, deleteContact, toggleFavourite].some(
            (thunk) => thunk.rejected.match(action)
          ),
        (state, action) => {
          state.error = action.error.message;
        }
      );
  },
});


// CreateSelector
const selectContactsState = (state) => state.contacts;

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

export const selectContactById = (state, id) =>
  selectContacts(state).find(
    (contact) => String(contact.id || contact._id) === String(id)
  );

export const selectContactsBySearch = createSelector(
  [selectContacts, (_state, searchTerm) => searchTerm],
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
