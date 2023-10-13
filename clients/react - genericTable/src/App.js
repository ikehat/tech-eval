import React from 'react';
import { CompaniesProvider } from './contexts/CompaniesContext';
import GenericTable from './components/GenericTable';
import Popup from './components/Popup';
import './App.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <CompaniesProvider>
      <Router>
        <div className="app-container">
          <h1>Company Management App</h1>
          <Routes>
            {['/', '/company'].map(path => <Route key={path} path={path} element={
              <GenericTable 
              type="company"
              hideBackButton={true}
              allowOpen={true}
            /> } />)}
            <Route path="/company/:companyId/contact" element={
              <GenericTable 
              type="contact"
              hideBackButton={false}
              allowOpen={true}
            /> } />
            <Route path="/company/:companyId/contact/:contactId/interaction" element={
              <GenericTable
              type="interaction"
              hideBackButton={false}
              allowOpen={false}
            /> } />
            {['/add-company', '/edit-company', '/add-contact', '/edit-contact', '/add-interaction', '/edit-interaction'].map(path => <Route key={path} path={path} element={<Popup />} />)}
          </Routes>
        </div>
      </Router>
    </CompaniesProvider>
  );
}

export default App;
