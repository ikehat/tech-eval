// src/stores/companies.js
// import { defineStore } from '@pinia/vue';
import { defineStore } from 'pinia'
const server = "http://localhost:5000";
export const useCompaniesStore = defineStore('companies', {
    state: () => ({
        companies: [],
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
        
        async addContact(contact) {
            try {
                const res = await fetch(`${server}/companies/${this.activeCompany}/contacts`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(contact)
                });
                const newContact = await res.json();
                this.companies = this.companies.map(company => company.id == this.activeCompany ? company.contacts.push(newContact) : company);
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
                this.companies = this.companies.map(company => company.id == this.activeCompany ? company.contacts.map(c => c.id == contact.id ? contact : c) : company);
            } catch (error) {
                console.error("Failed to update contact:", error);
            }
        },
        async deleteContact(id) {
            try {
                const companies = JSON.parse(JSON.stringify(this.companies))
                await fetch(`${server}/companies/${this.activeCompany}/contacts/${id}`, { method: 'DELETE' });
                const activeCompany = companies.find(company => company.id == this.activeCompany);
                const contacts = activeCompany.contacts.filter(contact => contact.id != id);
                activeCompany.contacts = contacts;
                const newCompanies = companies.map(company => company.id == this.activeCompany ? activeCompany : company);
                this.companies = newCompanies;
            } catch (error) {
                console.error("Failed to delete contact:", error);
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
                const activeCompany = this.companies.find(company => company.id == this.activeCompany);
                const activeContact = activeCompany.contacts.find(contact => contact.id == this.activeContact);
                activeContact.interactions.push(newInteraction);
                this.companies = this.companies.map(company => company.id == this.activeCompany ? activeCompany : company);
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
                const activeCompany = this.companies.find(company => company.id == this.activeCompany);
                const activeContact = activeCompany.contacts.find(contact => contact.id == this.activeContact);
                activeContact.interactions = activeContact.interactions.map(i => i.id == interaction.id ? interaction : i);
                this.companies = this.companies.map(company => company.id == this.activeCompany ? activeCompany : company);
            } catch (error) {
                console.error("Failed to update interaction:", error);
            }
        },
        async deleteInteraction(id) {
            try {
                await fetch(`${server}/companies/${this.activeCompany}/contacts/${this.activeContact}/interactions/${id}`, { method: 'DELETE' });
                const activeCompany = this.companies.find(company => company.id == this.activeCompany);
                const activeContact = activeCompany.contacts.find(contact => contact.id == this.activeContact);
                activeContact.interactions = activeContact.interactions.filter(interaction => interaction.id != id);
                this.companies = this.companies.map(company => company.id == this.activeCompany ? activeCompany : company);
            } catch (error) {
                console.error("Failed to delete interaction:", error);
            }
        },

        setCompanies(companies) {
            this.companies = companies;
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
