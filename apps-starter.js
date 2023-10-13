const express = require('express');
const app = express();
const http = require('http');
const path = require('path');

// NODE
const nodeApp = express();
const nodePort = 5000;

const nodeServer = require('./server/index.js');
nodeServer.main();

// REACT
const reactApp = express();
const reactPort = 2000;

const reactBuildPath = path.join(__dirname, 'clients', 'react', 'build');
reactApp.use(express.static(reactBuildPath));

reactApp.get('*', (req, res) => {
  res.sendFile(path.join(reactBuildPath,'/index.html'));
});

http.createServer(reactApp).listen(reactPort, () => {
    console.log(`REACT Server is running on port ${reactPort}`);
});

// VUE
const vueApp = express();
const vuePort = 4000;

const vueBuildPath = path.join(__dirname, 'clients', 'vue', 'dist');
vueApp.use(express.static(vueBuildPath));

vueApp.get('*', (req, res) => {
  res.sendFile(path.join(vueBuildPath,'/index.html'));
});

http.createServer(vueApp).listen(vuePort, () => {
    console.log(`VUE Server is running on port ${vuePort}`);
});

// SVELTE
const sveltePort = 3000;
import('./clients/svelte/build/index.js')
  .then(() => {
      console.log('Svelte build index.js loaded and executed.');
  })
  .catch(err => {
      console.error('Error loading Svelte build index.js:', err);
  });

// server.js
const MAINPORT = 80;

app.get('/css', (req, res) => {
  res.sendFile(path.join(__dirname, 'style.css'));
});

app.use((req, res, next) => {
  if (req.subdomains.length > 0 && req.subdomains[0] === 'react') {
    const newURL = `http://${req.hostname}:${reactPort}${req.originalUrl}`;
    res.redirect(newURL);
  } else if (req.subdomains.length > 0 && req.subdomains[0] === 'vue') {
    const newURL = `http://${req.hostname}:${vuePort}${req.originalUrl}`;
    res.redirect(newURL);
  } else if (req.subdomains.length > 0 && req.subdomains[0] === 'svelte') {
    const newURL = `http://${req.hostname}:${sveltePort}${req.originalUrl}`;
    res.redirect(newURL);
  }
  else {
      next();
  }
});

app.get('/', (req, res) => {
    res.send('Main domain response');
});

app.listen(MAINPORT, () => {
    console.log(`MAIN Server is running at http://localhost:${MAINPORT}`);
});
