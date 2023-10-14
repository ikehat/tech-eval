// ./src/contexts/CompaniesContext.js
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
const BASE_URL = 'http://node.ik2.co:5000';

const CompaniesContext = createContext();
export const CompaniesProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [interactions, setInteractions] = useState([]);
  const [activeCompany, setActiveCompany] = useState("");
  const [activeContact, setActiveContact] = useState("");
  const [activeInteraction, setActiveInteraction] = useState("");

  function getCompanies() {
    (async () => {
      const res = await axios.get(BASE_URL+'/companies');
      const companies = res.data;
      setCompanies(companies);
    })();
  }
  function addCompany(company) {
    (async () => {
      const res = await axios.post(BASE_URL+'/companies', company);
      const newCompany = res.data;
      setCompanies([...companies, newCompany]);
    })();
  }
  function editCompany(company) {
    (async () => {
      await axios.put(`${BASE_URL}/companies/${company.id}`, company);
      const companyIndex = companies.findIndex(c => c.id === parseInt(company.id));
      const updatedCompanies = [...companies];
      updatedCompanies[companyIndex] = company;
      setCompanies(updatedCompanies);
    })();
  }
  function deleteCompany(companyId) {
    (async () => {
      await axios.delete(`${BASE_URL}/companies/${companyId}`);
      const updatedCompanies = companies.filter(c => c.id !== parseInt(companyId));
      setCompanies(updatedCompanies);
    })();
  }

  function getContacts() {
    (async () => {
      const res = await axios.get(`${BASE_URL}/companies/${activeCompany}/contacts`);
      const contacts = res.data;
      setContacts(contacts);
    })();
  }
  function addContact(contact) {
    (async () => {
      const res = await axios.post(`${BASE_URL}/companies/${activeCompany}/contacts`, contact);
      const newContact = res.data;
      setContacts([...contacts, newContact]);
    })();
  }
  function editContact(contact) {
    (async () => {
      await axios.put(`${BASE_URL}/companies/${activeCompany}/contacts/${contact.id}`, contact);
      const contactIndex = contacts.findIndex(c => c.id === parseInt(contact.id));
      const updatedContacts = [...contacts];
      updatedContacts[contactIndex] = contact;
      setContacts(updatedContacts);
    })();
  }
  function deleteContact(contactId) {
    (async () => {
      await axios.delete(`${BASE_URL}/companies/${activeCompany}/contacts/${contactId}`);
      const updatedContacts = contacts.filter(c => c.id !== parseInt(contactId));
      setContacts(updatedContacts);
    })();
  }

  function getInteractions() {
    (async () => {
      const res = await axios.get(`${BASE_URL}/companies/${activeCompany}/contacts/${activeContact}/interactions`);
      const interactions = res.data;
      setInteractions(interactions);
    })();
  }
  function addInteraction(interaction) {
    (async () => {
      const res = await axios.post(`${BASE_URL}/companies/${activeCompany}/contacts/${activeContact}/interactions`, interaction);
      const newInteraction = res.data;
      setInteractions([...interactions, newInteraction]);
    })();
  }
  function editInteraction(interaction) {
    (async () => {
      await axios.put(`${BASE_URL}/companies/${activeCompany}/contacts/${activeContact}/interactions/${interaction.id}`, interaction);
      const interactionIndex = interactions.findIndex(i => i.id === parseInt(interaction.id));
      const updatedInteractions = [...interactions];
      updatedInteractions[interactionIndex] = interaction;
      setInteractions(updatedInteractions);
    })();
  }
  function deleteInteraction(interactionId) {
    (async () => {
      await axios.delete(`${BASE_URL}/companies/${activeCompany}/contacts/${activeContact}/interactions/${interactionId}`);
      const updatedInteractions = interactions.filter(i => i.id !== parseInt(interactionId));
      setInteractions(updatedInteractions);
    })();
  }
  
  return (
    <CompaniesContext.Provider value={{ companies, contacts, interactions,
      setActiveCompany, setActiveContact, setActiveInteraction,
      activeCompany, activeContact, activeInteraction,
      getCompanies, addCompany, editCompany, deleteCompany,
      getContacts, addContact, editContact, deleteContact,
      getInteractions, addInteraction, editInteraction, deleteInteraction
    }}>
        {children}
    </CompaniesContext.Provider>
  );
};

export const useCompanies = () => useContext(CompaniesContext);
