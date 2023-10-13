// ./src/components/InteractionTable.js
import React, { useEffect } from 'react';
import { useCompanies } from '../contexts/CompaniesContext';
import axios from 'axios';
import { useNavigate, useParams  } from 'react-router-dom';
const BASE_URL = 'http://node.ik2.co:5000';

function InteractionTable() {
    const navigate = useNavigate();
    const { companies, setCompanies, setActiveCompany, setActiveContact } = useCompanies();
    const { companyId, contactId } = useParams();

    useEffect(() => {
        const activeCompany = companies.find(c => c.id === parseInt(companyId));
        const activeContact = activeCompany.contacts.find(c => c.id === parseInt(contactId));
        setActiveCompany(activeCompany);
        setActiveContact(activeContact);
    },[setActiveCompany, companies, setActiveContact, companyId, contactId]);

    const company = companies.find(c => c.id === parseInt(companyId));
    const contact = company.contacts.find(c => c.id === parseInt(contactId));
    const interactions = contact.interactions;

    const handleAdd = () => {
        navigate(`/add-interaction`, { state: { type: 'interaction', initialData: { id: false, date: '', description: '', status: '' }, pageBack: `/company/${companyId}/contact/${contactId}/interaction` } });
    };

    const handleEdit = (interaction) => {
        navigate(`/edit-interaction`, { state: { type: 'interaction', initialData: interaction, pageBack: `/company/${companyId}/contact/${contactId}/interaction` } });
    };

    const handleDelete = (interactionid) => {
        // const updatedCompanies = [...companies];
        const interactionIndex = interactions.findIndex(c => c.id === parseInt(interactionid));
        interactions.splice(interactionIndex, 1);

        setCompanies([...companies]);
        axios.delete(`${BASE_URL}/companies/${company.id}/contacts/${contactId}/interactions/${interactionid}`);
    };

    function handleBack() {
        navigate(`/company/${companyId}/contact`);
    }

    return (
    <div>
        <button onClick={handleBack}>Back</button>
        <table>
            <thead>
            <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {interactions.map(interaction => (
                <tr key={interaction.id}>
                <td>{interaction.date}</td>
                <td>{interaction.description}</td>
                <td>{interaction.status}</td>
                <td class="table-options">
                    <button onClick={() => {handleEdit(interaction)}}>
                        Edit
                    </button>
                    <button onClick={() => {handleDelete(interaction.id)}}>
                        Delete
                    </button>
                    {/* Add more actions like delete here */}
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

export default InteractionTable;
