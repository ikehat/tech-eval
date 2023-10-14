// ./src/components/CompanyTable.js
import React, { useEffect } from 'react';
import { useCompanies } from '../contexts/CompaniesContext';
import { useNavigate } from 'react-router-dom';

const CompanyTable = () => {
  const navigate = useNavigate();
  const { getCompanies, companies, deleteCompany } = useCompanies();

  useEffect(() => {
    getCompanies();
  }, []);

  const handleAdd = () => {
    const initialData = { id: false, companyName: '', website: '', contacts: [] };
    navigate("/add-company", { state: { type: 'company', initialData, pageBack: '/' } });
  };

  const handleEdit = (company) => {
    navigate("/edit-company", { state: { type: 'company', initialData: company, pageBack: '/' } });
  };

  const handleDelete = (id) => {
    deleteCompany(id);
  };

  const handleOpenCompany = (company) => {
    navigate(`/company/${company.id}/contact`);
  };

  return (
    <div>
      <h1>Company</h1>
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
