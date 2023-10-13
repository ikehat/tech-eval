// ./src/contexts/CompaniesContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const CompaniesContext = createContext();
const BASE_URL = 'http://node.ik2.co:5000';

export const CompaniesProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [activeCompany, setActiveCompany] = useState([]);
  const [activeContact, setActiveContact] = useState([]);
  const [activeInteraction, setActiveInteraction] = useState([]);

  useEffect(() => {
    const getCompanies = async () => {
      const res = await fetch(`${BASE_URL}/companies`);
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
