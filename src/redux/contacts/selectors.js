import { createSelector } from '@reduxjs/toolkit';
import { selectNameFilter } from '../filter/selectors';
export const selectIsModal = state => state.contacts.modal;

export const selectContactName = state => state.contacts.contactName;

export const selectContacts = state =>
    state.contacts.items;


export const selectFilteredContacts = createSelector(
    [selectContacts, selectNameFilter], (visibleContacts, filter) => {
        return visibleContacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase()))
    }
)
