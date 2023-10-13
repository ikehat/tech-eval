<!-- src/routes/+page.svelte -->
<script>
    import { goto } from '$app/navigation';
    import { sharedData } from '$lib/store.js';
    import { deleteInteraction } from '$lib/apiService.js';

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
            pageBack: `/companies/${companyId}/contacts/${contactId}`
        };
        goto(url, {replaceState: true});
    }
    
    function handleAdd() {
        console.log('Add new interaction');
        const blankInteraction = {
            id: false,
            date: '',
            description: '',
            status: ''
        };
        moveTo('/add-interaction', blankInteraction);
    }

    function handleEdit(id) {
        console.log('Edit interaction with id:', id);
        const interaction = interactions.find(interaction => interaction.id === id);
        moveTo('/edit-contact', interaction);
    }

    function handleDelete(id) {
        console.log('Delete interaction with id:', id);
        interactions = interactions.filter(interaction => interaction.id !== id);
        deleteInteraction(companyId, contactId, id);
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
                    <button on:click={() => handleEdit(interaction.id)}>Edit</button>
                    <button on:click={() => handleDelete(interaction.id)}>Delete</button>
                </td>
            </tr>
        {/each}
    </tbody>
</table>
<button on:click={handleAdd}>Add</button>