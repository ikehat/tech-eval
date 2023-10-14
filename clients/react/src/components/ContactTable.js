// ./src/components/ContactTable.js
import React, { useEffect } from 'react';
import { useCompanies } from '../contexts/CompaniesContext';
import { useNavigate, useParams  } from 'react-router-dom';

function ContactTable() {
  const navigate = useNavigate();
  const { contacts, getContacts, setActiveCompany, activeCompany, deleteContact } = useCompanies();
  const { companyId } = useParams();

  useEffect(() => {
    setActiveCompany(companyId);
  }, []);

  useEffect(() => {
    if (activeCompany) {
      getContacts();
    }
  }, [activeCompany]);

  const handleAdd = () => {
    navigate(`/add-contact`, { state: { type: 'contact', initialData: { id: false, name: '', email: '', mobile: '', status: '', interactions: [] }, pageBack: `/company/${companyId}/contact` } });
  };

  const handleEdit = (contact) => {
    navigate(`/edit-contact`, { state: { type: 'contact', initialData: contact, pageBack: `/company/${companyId}/contact` } });
  };

  const handleDelete = (contactid) => {
      deleteContact(contactid);
  };

  const handleOpenContact = (contact) => {
    navigate(`/company/${companyId}/contact/${contact.id}/interaction`);
  }

  function handleBack() {
    navigate("/");
  }

  return (
    <div>
      <h1>Contact</h1>
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
