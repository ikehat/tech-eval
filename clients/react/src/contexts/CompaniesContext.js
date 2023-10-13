// ./src/contexts/CompaniesContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const CompaniesContext = createContext();

export const CompaniesProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [activeCompany, setActiveCompany] = useState([]);
  const [activeContact, setActiveContact] = useState([]);
  const [activeInteraction, setActiveInteraction] = useState([]);

  useEffect(() => {
    const getCompanies = async () => {
      const res = await fetch('http://localhost:5000/companies');
      const data = await res.json();
      setCompanies(data);
    };
    getCompanies();
  }, []);
  
  if(!companies.length) {
    return <div>Loading...</div>;
  }
  
  return (
    <CompaniesContext.Provider value={{ companies, setCompanies, activeCompany, setActiveCompany, activeContact, setActiveContact, activeInteraction, setActiveInteraction }}>
        {children}
    </CompaniesContext.Provider>
  );
};

export const useCompanies = () => useContext(CompaniesContext);
