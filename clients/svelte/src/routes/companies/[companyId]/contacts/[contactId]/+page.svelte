<!-- src/routes/+page.svelte -->
<script>
    import axios from 'axios';
    import { goto } from '$app/navigation';
    import { sharedData } from '$lib/store.js';
    
    export let data;
    let { companyId, contactId, interactions } = data;

    function moveTo(url, data) {
        $sharedData = { 
            companyId,
            contactId,
            type: 'interaction',
            initialData: data,
            formFormatter: {
                date: {name: 'Date', type: 'date'},
                description: {name: 'Description', type: 'text'},
                status: {name: 'Status'}
            },
            postRequest: `http://localhost:5000/companies/${companyId}/contacts/${contactId}/interactions`,
            putRequest: `http://localhost:5000/companies/${companyId}/contacts/${contactId}/interactions/${data.id}`,
            pageBack: `/companies/${companyId}/contacts/${contactId}`
        };
        goto(url, {replaceState: true});
    }
    
    function addInteraction() {
        console.log('Add new interaction');
        const blankInteraction = {
            id: false,
            date: '',
            description: '',
            status: ''
        };
        moveTo('/add-interaction', blankInteraction);
    }

    function editInteraction(id) {
        console.log('Edit interaction with id:', id);
        const interaction = interactions.find(interaction => interaction.id === id);
        moveTo('/edit-contact', interaction);
    }

    function deleteInteraction(id) {
        console.log('Delete interaction with id:', id);
        interactions = interactions.filter(interaction => interaction.id !== id);
        axios.delete(`http://localhost:5000/companies/${companyId}/contacts/${contactId}/interactions/${id}`);
    }
</script>

<button on:click={()=> goto(`/companies/${companyId}`)}>Back</button>
<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Description</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
        {#each interactions as interaction}
            <tr>
                <td>{interaction.id}</td>
                <td>{interaction.date}</td>
                <td>{interaction.description}</td>
                <td>{interaction.status}</td>
                <td>
                    <button on:click={() => editInteraction(interaction.id)}>Edit</button>
                    <button on:click={() => deleteInteraction(interaction.id)}>Delete</button>
                </td>
            </tr>
        {/each}
    </tbody>
</table>
<button on:click={addInteraction}>Add</button>