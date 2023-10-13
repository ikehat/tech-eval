// ./src/components/GenericTable.js
import React, { useEffect } from 'react';
import { useCompanies } from '../contexts/CompaniesContext';
import axios from 'axios';
import { useNavigate, useParams  } from 'react-router-dom';

function GenericTable({type, pageBack, hideBackButton, initialData, allowOpen}) {
    const navigate = useNavigate();
    const { companies, setCompanies, setActiveCompany, setActiveContact } = useCompanies();
    const { companyId, contactId } = useParams();

    useEffect(() => {
        if (companyId) {
            const activeCompany = companies.find(c => c.id === parseInt(companyId));
            setActiveCompany(activeCompany);
        }

        if (companyId && contactId) {
            const activeCompany = companies.find(c => c.id === parseInt(companyId));
            const activeContact = activeCompany.contacts.find(c => c.id === parseInt(contactId));
            setActiveContact(activeContact);
        }
    },[]);

    let contacts, interactions;
    if (companyId) {
        contacts = companies.find(c => c.id === parseInt(companyId)).contacts;
    }
    if (companyId && contactId) {
        interactions = companies.find(c => c.id === parseInt(companyId)).contacts.find(c => c.id === parseInt(contactId)).interactions;
    }


    const handleAdd = () => {
        navigate(`/add-${type}`, { state: { type, initialData, pageBack: window.location.pathname } });
    };

    const handleEdit = (editData) => {
        navigate(`/edit-${type}`, { state: { type, initialData: editData, pageBack: window.location.pathname } });
    };

    const handleDelete = (id) => {
        if (type === 'company') {
            const index = companies.findIndex(c => c.id === parseInt(id));
            companies.splice(index, 1);
            setCompanies([...companies]);
            axios.delete(`/companies/${id}`);
        } else if (type === 'contact') {
            const index = contacts.findIndex(c => c.id === parseInt(id));
            contacts.splice(index, 1);
            setCompanies([...companies]);
            axios.delete(`/companies/${companyId}/contacts/${id}`);
        } else if (type === 'interaction') {
            const index = interactions.findIndex(c => c.id === parseInt(id));
            interactions.splice(index, 1);
            setCompanies([...companies]);
            axios.delete(`/companies/${companyId}/contacts/${contactId}/interactions/${id}`);
        }
    };

    const handleOpen = (data) => {
      navigate(`${pageBack}/${data.id}/interaction`);
    }

    function handleBack() {
        const pageBack = window.location.pathname.split('/').slice(0,-2).join('/')
        navigate(pageBack);
    }

    let renderData;
    if (type === 'company') {
        renderData = companies;
    } else if (type === 'contact') {
        renderData = contacts;
    } else if (type === 'interaction') {
        renderData = interactions;
    }

    return (
    <div>
        {hideBackButton === false && <button onClick={handleBack}>Back</button>}
        <button onClick={handleBack}>Back</button>
        {/* <h2>Interactions for {contact.name}</h2> */}
        <button onClick={handleAdd}>
            Add {type}
        </button>
        <table>
            <thead>
            <tr>
                {renderData[0] && Object.keys(renderData[0]).map(key => (
                    <th key={key}>{key}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {renderData.map(data => (
                <tr key={data.id}>
                    {Object.keys(data).map(key => (
                        <td key={key}>{data[key]}</td>
                    ))}
                    <td><button onClick={() => handleEdit(data)}>Edit</button></td>
                    <td><button onClick={() => handleDelete(data.id)}>Delete</button></td>
                    {allowOpen && <td><button onClick={() => handleOpen(data)}>Open</button></td>}
                </tr>
            ))}
            </tbody>
        </table>
    </div>
    );
}

export default GenericTable;
