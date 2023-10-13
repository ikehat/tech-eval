<!-- src/routes/+page.svelte -->
<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { sharedData } from '../lib/store.js';

    function moveTo(url, data) {
        $sharedData = { 
            type: 'company', 
            initialData: data,
            formFormatter: {
                companyName: {name: 'Company Name', type: 'text'},
                website: {name: 'Website', type: 'text'}
            },
            postRequest: `http://localhost:5000/companies`,
            putRequest: `http://localhost:5000/companies/${data.id}`,
            pageBack: "/"
        };
        goto(url, {replaceState: true});
    }

    let companies = [];
    async function fetchInitialData() {
        try {
            const response = await axios.get('http://localhost:5000/companies');
            const data = response.data;
            companies = data;
        } catch (err) {
            error = err.message;
        }
    }

    // You can call fetchData() on mount if you want to fetch data when the component loads
    onMount(fetchInitialData);
    
    function addCompany() {
        console.log('Add new company');
        const blankCompany = {
            id: false,
            companyName: '',
            website: '',
            contacts: []
        };
        moveTo('/add-company', blankCompany);
    }

    function editCompany(id) {
        console.log('Edit company with id:', id);
        const company = companies.find(company => company.id === id);
        moveTo('/edit-company', company);
    }

    function deleteCompany(id) {
        console.log('Delete company with id:', id);
        companies = companies.filter(company => company.id !== id);
        axios.delete(`http://localhost:5000/companies/${id}`);
    }

    function openCompany(company) {
        goto('/companies/' + company.id);
    }
</script>

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
        {#each companies as company}
            <tr>
                <td>{company.id}</td>
                <td>{company.companyName}</td>
                <td><a href="{company.website}" target="_blank">{company.website}</a></td>
                <td>
                    <button on:click={() => editCompany(company.id)}>Edit</button>
                    <button on:click={() => deleteCompany(company.id)}>Delete</button>
                    <button on:click={() => openCompany(company)}>Open</button>
                </td>
            </tr>
        {/each}
    </tbody>
</table>
<button on:click={addCompany}>Add</button>