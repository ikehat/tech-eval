<!-- src/routes/+page.svelte -->
<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { sharedData } from '../lib/store.js';
    import { deleteCompany } from '$lib/apiService.js';
    
    export let data;
    let { companies } = data;

    function moveTo(url, data) {
        $sharedData = { 
            type: 'company', 
            initialData: data,
            formFormatter: {
                companyName: {name: 'Company Name', type: 'text'},
                website: {name: 'Website', type: 'text'}
            },
            pageBack: "/"
        };
        goto(url, {replaceState: true});
    }
    
    function handleAdd() {
        console.log('Add new company');
        const blankCompany = {
            id: false,
            companyName: '',
            website: '',
            contacts: []
        };
        moveTo('/add-company', blankCompany);
    }

    function handleEdit(id) {
        console.log('Edit company with id:', id);
        const company = companies.find(company => company.id === id);
        moveTo('/edit-company', company);
    }

    function handleDelete(id) {
        console.log('Delete company with id:', id);
        companies = companies.filter(company => company.id !== id);
        deleteCompany(id);
    }

    function handleOpen(company) {
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
                    <button on:click={() => handleEdit(company.id)}>Edit</button>
                    <button on:click={() => handleDelete(company.id)}>Delete</button>
                    <button on:click={() => handleOpen(company)}>Open</button>
                </td>
            </tr>
        {/each}
    </tbody>
</table>
<button on:click={handleAdd}>Add</button>