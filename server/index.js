async function main() {  
    const express = require('express');
    const http = require('http');
    const https = require('https');
    const fs = require('fs');
    const app = express();
    const expressOasGenerator = require('express-oas-generator');
    const port = 5000;
    const parser = require('body-parser');
    const path = require('path');
    const appname = 'minimal-crm'
    const KEY = `/etc/letsencrypt/live/${appname}/privkey.pem`;
    const CERT = `/etc/letsencrypt/live/${appname}/fullchain.pem`;
    const isOnline = fs.existsSync(KEY) && fs.existsSync(CERT);
    const cors = require('cors');

    const dataFilepath = path.join(__dirname, 'data.json');
    if (!fs.existsSync(dataFilepath)) {
        fs.writeFileSync(dataFilepath, '[]', 'utf8');
    }

    function persistData(req, res, next) {
        // If response is finished or sent to the client, attach a 'finish' event listener
        res.on('finish', function() {
            if (['PUT', 'DELETE', 'POST'].includes(req.method)) {
                fs.writeFileSync(dataFilepath, JSON.stringify(companies), 'utf8');
            }
        });

        next(); // Proceed to the next middleware or route handler
    }
    app.use(persistData);

    let companies = JSON.parse(fs.readFileSync(dataFilepath, 'utf8'));
    // let companies = [
    //     {
    //         id: 1,
    //         companyName: 'Acme Corp',
    //         website: 'https://acme.com',
    //         contacts: [
    //             {
    //                 id: 1,
    //                 name: 'John Doe',
    //                 email: 'john@acme.com',
    //                 mobile: '123456789',
    //                 status: 'Lead',
    //                 interactions: [
    //                     {
    //                         id: 1,
    //                         date: '2023-09-26',
    //                         description: 'Initial contact',
    //                         status: 'Completed'
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // ];
            
    // Initialize express-oas-generator
    const swaggerFilepath = path.join(__dirname, 'swagger.json');
    if (!fs.existsSync(swaggerFilepath)) {
        fs.writeFileSync(swaggerFilepath, '{}', 'utf8'); 
    }

    const swaggerData = JSON.parse(fs.readFileSync(swaggerFilepath, 'utf8'));
    expressOasGenerator.init(app, swaggerData);
    setInterval(() => {
        // console.log('Updating swagger.json');
        fs.writeFileSync(swaggerFilepath, JSON.stringify(expressOasGenerator.getSpec()), 'utf8');
        // console.log('Updated swagger.json');
    }, 60 * 1000);

    app.use(parser.json());
    app.use(cors());

    // GET all companies
    app.get('/companies', (req, res) => {
        res.json(companies);
    });

    // GET a single company by ID
    app.get('/companies/:id', (req, res) => {
        const company = companies.find(c => c.id === parseInt(req.params.id));
        if (company) res.json(company);
        else res.status(404).send('company not found');
    });

    // POST (create) a new company
    app.post('/companies', (req, res) => {
        const newcompany = req.body;
        newcompany.id = Date.now();
        companies.push(newcompany);
        res.status(201).json(newcompany);
    });

    // PUT (update) a company by ID
    app.put('/companies/:id', (req, res) => {
        const company = companies.find(c => c.id === parseInt(req.params.id));
        if (company) {
            Object.assign(company, req.body);
            res.json(company);
        } else {
            res.status(404).send('company not found');
        }
    });

    // DELETE a company by ID
    app.delete('/companies/:id', (req, res) => {
        const index = companies.findIndex(c => c.id === parseInt(req.params.id));
        if (index !== -1) {
            companies.splice(index, 1);
            res.status(204).send();
        } else {
            res.status(404).send('company not found');
        }
    });

    // GET all contacts for a company
    app.get('/companies/:companyid/contacts', (req, res) => {
        const company = companies.find(c => c.id === parseInt(req.params.companyid));
        if (company) res.json(company.contacts);
        else res.status(404).send('company not found');
    });

    // GET a single contact by ID
    app.get('/companies/:companyid/contacts/:contactid', (req, res) => {
        const company = companies.find(c => c.id === parseInt(req.params.companyid));
        if (company) {
            const contact = company.contacts.find(c => c.id === parseInt(req.params.contactid));
            if (contact) res.json(contact);
            else res.status(404).send('contact not found');
        } else {
            res.status(404).send('company not found');
        }
    });

    // POST (create) a new contact
    app.post('/companies/:companyid/contacts', (req, res) => {
        const company = companies.find(c => c.id === parseInt(req.params.companyid));
        if (company) {
            const newcontact = req.body;
            newcontact.id = Date.now();
            company.contacts.push(newcontact);
            res.status(201).json(newcontact);
        } else {
            res.status(404).send('company not found');
        }
    });

    // PUT (update) a contact by ID
    app.put('/companies/:companyid/contacts/:contactid', (req, res) => {
        const company = companies.find(c => c.id === parseInt(req.params.companyid));
        if (company) {
            const contact = company.contacts.find(c => c.id === parseInt(req.params.contactid));
            if (contact) {
                Object.assign(contact, req.body);
                res.json(contact);
            } else {
                res.status(404).send('contact not found');
            }
        } else {
            res.status(404).send('company not found');
        }
    });

    // DELETE a contact by ID
    app.delete('/companies/:companyid/contacts/:contactid', (req, res) => {
        const company = companies.find(c => c.id === parseInt(req.params.companyid));
        if (company) {
            const index = company.contacts.findIndex(c => c.id === parseInt(req.params.contactid));
            if (index !== -1) {
                company.contacts.splice(index, 1);
                res.status(204).send();
            } else {
                res.status(404).send('contact not found');
            }
        } else {
            res.status(404).send('company not found');
        }
    });

    // GET all interactions for a contact
    app.get('/companies/:companyid/contacts/:contactid/interactions', (req, res) => {
        const company = companies.find(c => c.id === parseInt(req.params.companyid));
        if (company) {
            const contact = company.contacts.find(c => c.id === parseInt(req.params.contactid));
            if (contact) res.json(contact.interactions);
            else res.status(404).send('contact not found');
        } else {
            res.status(404).send('company not found');
        }
    });

    // GET a single interaction by ID
    app.get('/companies/:companyid/contacts/:contactid/interactions/:interactionid', (req, res) => {
        const company = companies.find(c => c.id === parseInt(req.params.companyid));
        if (company) {
            const contact = company.contacts.find(c => c.id === parseInt(req.params.contactid));
            if (contact) {
                const interaction = contact.interactions.find(i => i.id === parseInt(req.params.interactionid));
                if (interaction) res.json(interaction);
                else res.status(404).send('interaction not found');
            } else {
                res.status(404).send('contact not found');
            }
        } else {
            res.status(404).send('company not found');
        }
    });

    // POST (create) a new interaction
    app.post('/companies/:companyid/contacts/:contactid/interactions', (req, res) => {
        const company = companies.find(c => c.id === parseInt(req.params.companyid));
        if (company) {
            const contact = company.contacts.find(c => c.id === parseInt(req.params.contactid));
            if (contact) {
                const newinteraction = req.body;
                newinteraction.id = Date.now();
                contact.interactions.push(newinteraction);
                res.status(201).json(newinteraction);
            } else {
                res.status(404).send('contact not found');
            }
        } else {
            res.status(404).send('company not found');
        }
    });

    // PUT (update) an interaction by ID
    app.put('/companies/:companyid/contacts/:contactid/interactions/:interactionid', (req, res) => {
        const company = companies.find(c => c.id === parseInt(req.params.companyid));
        if (company) {
            const contact = company.contacts.find(c => c.id === parseInt(req.params.contactid));
            if (contact) {
                const interaction = contact.interactions.find(i => i.id === parseInt(req.params.interactionid));
                if (interaction) {
                    Object.assign(interaction, req.body);
                    res.json(interaction);
                } else {
                    res.status(404).send('interaction not found');
                }
            } else {
                res.status(404).send('contact not found');
            }
        } else {
            res.status(404).send('company not found');
        }
    });

    // DELETE an interaction by ID
    app.delete('/companies/:companyid/contacts/:contactid/interactions/:interactionid', (req, res) => {
        const company = companies.find(c => c.id === parseInt(req.params.companyid));
        if (company) {
            const contact = company.contacts.find(c => c.id === parseInt(req.params.contactid));
            if (contact) {
                const index = contact.interactions.findIndex(i => i.id === parseInt(req.params.interactionid));
                if (index !== -1) {
                    contact.interactions.splice(index, 1);
                    res.status(204).send();
                } else {
                    res.status(404).send('interaction not found');
                }
            } else {
                res.status(404).send('contact not found');
            }
        } else {
            res.status(404).send('company not found');
        }
    });

    app.get('/*', (req, res) => {
        console.log(req.url)
        res.status(404).send('Not found');
    });

    if (isOnline) {
        const options = {
            key: fs.readFileSync(KEY),
            cert: fs.readFileSync(CERT),
        };

        https.createServer(options, app).listen(443, () => {
            console.log(`NODE backend Server is running on port ${443}`);
        });

        http.createServer((req, res) => {
            res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
            res.end();
        }).listen(80);
    } else {
        http.createServer(app).listen(port, () => {
        console.log(`NODE backend Server is running on port ${port}`);
        });
    }
}

module.exports = {
    main
};