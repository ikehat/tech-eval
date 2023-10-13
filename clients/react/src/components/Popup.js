import React, { useState, useEffect } from 'react';
import { useCompanies } from '../contexts/CompaniesContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Popup = () => {
  const { companies, setCompanies, activeCompany, activeContact } = useCompanies();
  const navigate = useNavigate();
  const location = useLocation();
  const type = location.state.type;
  const initialData = location.state.initialData;
  const pageBack = location.state.pageBack;

  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  function addEditCompany(company) {
    const updatedCompanies = [...companies];
    if (company.id) {
      const companyIndex = companies.findIndex(c => c.id === parseInt(company.id));
      updatedCompanies[companyIndex] = company;
      axios.put(`http://localhost:5000/companies/${company.id}`, company);
      setCompanies(updatedCompanies);
    } else {
      (async () => {
        const res = await axios.post('http://localhost:5000/companies', company);
        const newCompany = res.data;
        updatedCompanies.push(newCompany);
        setCompanies(updatedCompanies);
      })();
    }
  }

  function addEditContact(contact) {
    const contacts = activeCompany.contacts;
    if (contact.id) {
      const contactIndex = contacts.findIndex(c => c.id === parseInt(contact.id));
      contacts[contactIndex] = contact;
      axios.put(`http://localhost:5000/companies/${activeCompany.id}/contacts/${contact.id}`, contact);
      setCompanies([...companies]);
    } else {
      (async () => {
        const res = await axios.post(`http://localhost:5000/companies/${activeCompany.id}/contacts`, contact);
        const newContact = res.data;
        contacts.push(newContact); 
        setCompanies([...companies]);
    })();
    }
  }

  function addEditInteraction(interaction) {
    const interactions = activeContact.interactions;
    if (interaction.id) {
      const interactionIndex = interactions.findIndex(i => i.id === parseInt(interaction.id));
      interactions[interactionIndex] = interaction;
      axios.put(`http://localhost:5000/companies/${activeCompany.id}/contacts/${activeContact.id}/interactions/${interaction.id}`, interaction);
      setCompanies([...companies]);
    } else {
      (async () => {
        const res = await axios.post(`http://localhost:5000/companies/${activeCompany.id}/contacts/${activeContact.id}/interactions`, interaction);
        const newInteraction = res.data;
        interactions.push(newInteraction);
        setCompanies([...companies]);
      })();
    }
  }

  const handleSubmit = () => {
    if (type === 'company') {
      addEditCompany(formData);
    }
    if (type === 'contact') {
      addEditContact(formData);
    }
    if (type === 'interaction') {
      addEditInteraction(formData);
    }

    navigate(pageBack);
  };

  const handleClose = () => {
    navigate(pageBack);
  };

  return (
    <div class="overlay">
      <div className="popup">
        {type === 'company' && (
          <div>
            <div class="popup-item">
                <div>Company Name</div>
                <input
                  value={formData.companyName}
                  onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Company Name"
                />
            </div>
            <div class="popup-item">
                <div>Website</div>
                <input
                  type='url'
                  value={formData.website}
                  onChange={e => setFormData({ ...formData, website: e.target.value })}
                  placeholder="Website"
                />
            </div>
          </div>
        )}

        {type === 'contact' && (
          <div>
            <div class="popup-item">
              <div>Name</div>
              <input
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="Name"
              />
            </div>

            <div class="popup-item">
              <div>Email</div>
              <input
                type='email'
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
              />
            </div>

            <div class="popup-item">
              <div>Mobile</div>
              <input
                  type='tel'
                  value={formData.mobile}
                  onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="Mobile"
              />
            </div>
            <div class="popup-item">
              <div>Status</div>
              <select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  placeholder="Status"
              >
                <option value=""></option>
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
        )}

        {type === 'interaction' && (
          <div>
            <div class="popup-item">
              <div>Status</div>
              <input
                type='date'
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                placeholder="Date"
              />
            </div>
              
            <div class="popup-item">
              <div>Status</div>
              <input
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description"
              />
            </div>
              
            <div class="popup-item">
              <div>Status</div>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
                placeholder="Status"
              >
                <option value=""></option>
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
        )}

        <button style={{marginRight:"10px"}} onClick={handleSubmit}>Submit</button>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
