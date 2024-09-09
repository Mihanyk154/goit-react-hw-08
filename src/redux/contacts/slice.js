import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from './operations';

import { logOut } from "../auth/operations";


export const handlePending = state => {
    state.error = null;
    state.loading = true;
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        loading: false,
        error: null,
        modal: false,
        contactName: null,
    },
    reducers: {
        openModal: (state) => {
            state.modal = true;
        },
        closeModal: (state) => {
            state.modal = false;
        },
        setContactName: (state, action) => {
            state.contactName = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchContacts.pending, handlePending)
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchContacts.rejected, state => {
                state.loading = false;
                state.error = "Failed to fetch contacts";
            })
            .addCase(addContact.pending, handlePending)
            .addCase(addContact.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.loading = false;
            })
            .addCase(addContact.rejected, state => {
                state.loading = false;
                state.error = "Failed to add contact";
            })
            .addCase(deleteContact.pending, handlePending)
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload.id);
                state.loading = false;
            })
            .addCase(deleteContact.rejected, state => {
                state.loading = false;
                state.error = "Failed to delete contact ";
            })
            .addCase(logOut.fulfilled, (state) => {
                state.items = [];
                state.loading = false;
                state.error = null;
            })

    }
});

export const { openModal, closeModal, setContactName } = contactsSlice.actions;

export default contactsSlice.reducer;