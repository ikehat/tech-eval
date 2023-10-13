// ./src/components/ContactTable.js
import React, { useEffect } from 'react';
import { useCompanies } from '../contexts/CompaniesContext';
import axios from 'axios';
import { useNavigate, useParams  } from 'react-router-dom';
const BASE_URL = 'http://node.ik2.co:5000';

function ContactTable() {
  const navigate = useNavigate();
  const { companies, setCompanies, setActiveCompany } = useCompanies();
  const { companyId } = useParams();

  useEffect(() => {
    const activeCompany = companies.find(c => c.id === parseInt(companyId));
    setActiveCompany(activeCompany);
  }, [setActiveCompany, companyId]);
  
  const company = companies.find(c => c.id === parseInt(companyId));
  const contacts = company.contacts;

  const handleAdd = () => {
    navigate(`/add-contact`, { state: { type: 'contact', initialData: { id: false, name: '', email: '', mobile: '', status: '', interactions: [] }, pageBack: `/company/${companyId}/contact` } });
  };

  const handleEdit = (contact) => {
    navigate(`/edit-contact`, { state: { type: 'contact', initialData: contact, pageBack: `/company/${companyId}/contact` } });
  };

  const handleDelete = (contactid) => {
      // const updatedCompanies = [...companies];
      const contactIndex = contacts.findIndex(c => c.id === parseInt(contactid));
      contacts.splice(contactIndex, 1);

      setCompanies([...companies]);
      axios.delete(`${BASE_URL}/companies/${companyId}/contacts/${contactid}`);
  };

  const handleOpenContact = (contact) => {
    navigate(`/company/${companyId}/contact/${contact.id}/interaction`);
  }

  function handleBack() {
    navigate("/");
  }

  return (
    <div>
      <button onClick={handleBack}>Back</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.mobile}</td>
              <td>{contact.status}</td>
              <td class="table-options">
                <button onClick={() => {handleEdit(contact)}}> Edit </button>
                <button onClick={() => {handleDelete(contact.id)}}> Delete </button>
                {/* Add more actions like delete or view interactions here */}
                <button onClick={() => handleOpenContact(contact)}>Open</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default ContactTable;
