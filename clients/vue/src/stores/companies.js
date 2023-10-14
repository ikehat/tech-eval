// src/stores/companies.js
// import { defineStore } from '@pinia/vue';
import { defineStore } from 'pinia'
const server = "http://node.ik2.co:5000";
export const useCompaniesStore = defineStore('companies', {
    state: () => ({
        companies: [],
        contacts: [],
        interactions: [],
        activeCompany: null,
        activeContact: null,
        activeInteraction: null,
        loading: true,
        popupAddEdit: {}
    }),
    actions: {
        async fetchCompanies() {
            try {
                const res = await fetch(`${server}/companies`);
                this.companies = await res.json();
                this.loading = false;
            } catch (error) {
                console.error("Failed to fetch companies:", error);
            }
        },
        async addCompany(company) {
            try {
                const res = await fetch(`${server}/companies`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(company)
                });
                const newCompany = await res.json();
                this.companies.push(newCompany);
            } catch (error) {
                console.error("Failed to add company:", error);
            }
        },
        async editCompany(company) {
            try {
                await fetch(`${server}/companies/${company.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(company)
                });
                this.companies = this.companies.map(c => c.id == company.id ? company : c);
            } catch (error) {
                console.error("Failed to update company:", error);
            }
        },
        async deleteCompany(id) {
            try {
                await fetch(`${server}/companies/${id}`, { method: 'DELETE' });
                this.companies = this.companies.filter(company => company.id != id);
            } catch (error) {
                console.error("Failed to delete company:", error);
            }
        },
        
        async fetchContacts() {
            try {
                const res = await fetch(`${server}/companies/${this.activeCompany}/contacts`);
                this.contacts = await res.json();
            } catch (error) {
                console.error("Failed to fetch contacts:", error);
            }
        },
        async addContact(contact) {
            try {
                const res = await fetch(`${server}/companies/${this.activeCompany}/contacts`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(contact)
                });
                const newContact = await res.json();
                this.contacts.push(newContact);
            } catch (error) {
                console.error("Failed to add contact:", error);
            }
        },
        async editContact(contact) {
            try {
                await fetch(`${server}/companies/${this.activeCompany}/contacts/${contact.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(contact)
                });
                this.contacts = this.contacts.map(c => c.id == contact.id ? contact : c);
            } catch (error) {
                console.error("Failed to update contact:", error);
            }
        },
        async deleteContact(id) {
            try {
                await fetch(`${server}/companies/${this.activeCompany}/contacts/${id}`, { method: 'DELETE' });
                this.contacts = this.contacts.filter(contact => contact.id != id);
            } catch (error) {
                console.error("Failed to delete contact:", error);
            }
        },

        async fetchInteractions() {
            try {
                const res = await fetch(`${server}/companies/${this.activeCompany}/contacts/${this.activeContact}/interactions`);
                this.interactions = await res.json();
            } catch (error) {
                console.error("Failed to fetch interactions:", error);
            }
        },
        async addInteraction(interaction) {
            try {
                const res = await fetch(`${server}/companies/${this.activeCompany}/contacts/${this.activeContact}/interactions`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(interaction)
                });
                const newInteraction = await res.json();
                this.interactions.push(newInteraction);
            } catch (error) {
                console.error("Failed to add interaction:", error);
            }
        },
        async editInteraction(interaction) {
            try {
                await fetch(`${server}/companies/${this.activeCompany}/contacts/${this.activeContact}/interactions/${interaction.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(interaction)
                });
                this.interactions = this.interactions.map(i => i.id == interaction.id ? interaction : i);
            } catch (error) {
                console.error("Failed to update interaction:", error);
            }
        },
        async deleteInteraction(id) {
            try {
                await fetch(`${server}/companies/${this.activeCompany}/contacts/${this.activeContact}/interactions/${id}`, { method: 'DELETE' });
                this.interactions = this.interactions.filter(interaction => interaction.id != id);
            } catch (error) {
                console.error("Failed to delete interaction:", error);
            }
        },

        setActiveCompany(companyId) {
            this.activeCompany = companyId;
        },
        setActiveContact(contactId) {
            this.activeContact = contactId;
        },
        setActiveInteraction(interactionId) {
            this.activeInteraction = interactionId;
        },
        setAddEditPopupInfo(popup) {
            this.popupAddEdit = popup;
        },
        getAddEditPopupInfo() {
            return this.popupAddEdit;
        }
    }
});
