// ./src/components/CompanyTable.js
import React from 'react';
import { useCompanies } from '../contexts/CompaniesContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const BASE_URL = 'http://node.ik2.co:5000';

const CompanyTable = () => {
  const navigate = useNavigate();
  const { companies, setCompanies } = useCompanies();

  const handleAdd = () => {
    const initialData = { id: false, companyName: '', website: '', contacts: [] };
    navigate("/add-company", { state: { type: 'company', initialData, pageBack: '/' } });
  };

  const handleEdit = (company) => {
    navigate("/edit-company", { state: { type: 'company', initialData: company, pageBack: '/' } });
  };

  const handleDelete = (id) => {
    const updatedCompanies = companies.filter(company => company.id !== id);
    setCompanies(updatedCompanies);
    axios.delete(`${BASE_URL}/companies/${id}`);
  };

  const handleOpenCompany = (company) => {
    navigate(`/company/${company.id}/contact`);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Website</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map(company => (
            <tr key={company.id}>
              <td>{company.id}</td>
              <td>{company.companyName}</td>
              <td>{company.website}</td>
              <td class="table-options">
                <button onClick={() => handleEdit(company)}>Edit</button>
                <button onClick={() => handleDelete(company.id)}>Delete</button>
                {/* You can also add a button here to view contacts or interactions */}
                <button onClick={() => handleOpenCompany(company)}>Open</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default CompanyTable;
