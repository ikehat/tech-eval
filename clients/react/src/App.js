import React from 'react';
import { CompaniesProvider } from './contexts/CompaniesContext';
import CompanyTable from './components/CompanyTable';
import ContactTable from './components/ContactTable';
import Popup from './components/Popup';
import InteractionTable from './components/InteractionTable';
import './App.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <CompaniesProvider>
      <Router>
        <div className="app-container" style={{padding:"15px"}}>
          <Routes>
            {['/', '/company'].map(path => <Route key={path} path={path} element={<CompanyTable />} />)}
            <Route path="/company/:companyId/contact" element={<ContactTable />} />
            <Route path="/company/:companyId/contact/:contactId/interaction" element={<InteractionTable /> } />
            {['/add-company', '/edit-company', '/add-contact', '/edit-contact', '/add-interaction', '/edit-interaction'].map(path => <Route key={path} path={path} element={<Popup />} />)}
          </Routes>
        </div>
      </Router>
    </CompaniesProvider>
  );
}

export default App;
