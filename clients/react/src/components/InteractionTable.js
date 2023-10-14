// ./src/components/InteractionTable.js
import React, { useEffect } from 'react';
import { useCompanies } from '../contexts/CompaniesContext';
import { useNavigate, useParams  } from 'react-router-dom';

function InteractionTable() {
    const navigate = useNavigate();
    const { interactions, getInteractions, setActiveCompany, activeCompany, setActiveContact, activeContact, deleteInteraction } = useCompanies();
    const { companyId, contactId } = useParams();


    useEffect(() => {
        setActiveCompany(companyId);
        setActiveContact(contactId);
    }, []);

    useEffect(() => {
        if (activeCompany && activeContact) {
            getInteractions();
        }
    }, [activeCompany, activeContact]);

    const handleAdd = () => {
        navigate(`/add-interaction`, { state: { type: 'interaction', initialData: { id: false, date: '', description: '', status: '' }, pageBack: `/company/${companyId}/contact/${contactId}/interaction` } });
    };

    const handleEdit = (interaction) => {
        navigate(`/edit-interaction`, { state: { type: 'interaction', initialData: interaction, pageBack: `/company/${companyId}/contact/${contactId}/interaction` } });
    };

    const handleDelete = (interactionid) => {
        deleteInteraction(interactionid);
    };

    function handleBack() {
        navigate(`/company/${companyId}/contact`);
    }

    return (
    <div>
        <h1>Interaction</h1>
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
