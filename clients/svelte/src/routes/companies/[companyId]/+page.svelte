<!-- src/routes/+page.svelte -->
<script>
    import { goto } from '$app/navigation';
    import { sharedData } from '$lib/store.js';
    import { deleteContact } from '$lib/apiService.js';
    
    export let data;
    let { companyId, contacts } = data;

    function moveTo(url, data) {
        $sharedData = {
            companyId,
            type: 'contact',
            initialData: data,
            formFormatter: {
                name: {name: 'Name', type: 'text'},
                email: {name: 'Email', type: 'email'},
                mobile: {name: 'Mobile', type: 'text'},
                status: {name: 'Status'}
            },
            pageBack: `/companies/${companyId}`
        };
        goto(url, {replaceState: true});
    }
    
    function handleAdd() {
        console.log('Add new contact');
        const blankContact = {
            id: false,
            name: '',
            email: '',
            mobile: '',
            status: '',
            interactions: []
        };
        moveTo('/add-contact', blankContact);
    }

    function handleEdit(id) {
        console.log('Edit contact with id:', id);
        const contact = contacts.find(contact => contact.id === id);
        moveTo('/edit-contact', contact);
    }

    function handleDelete(id) {
        console.log('Delete contact with id:', id);
        contacts = contacts.filter(contact => contact.id !== id);
        deleteContact(companyId, id);
    }

    function handleOpen(contact) {
        goto(`/companies/${companyId}/contacts/${contact.id}`);
    }
</script>

<h1>Contact</h1>
<button on:click={()=> goto(`/`)}>Back</button>
<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
        {#each contacts as contact}
            <tr>
                <td>{contact.id}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.mobile}</td>
                <td>{contact.status}</td>
                <td>
                    <button on:click={() => handleEdit(contact.id)}>Edit</button>
                    <button on:click={() => handleDelete(contact.id)}>Delete</button>
                    <button on:click={() => handleOpen(contact)}>Open</button>
                </td>
            </tr>
        {/each}
    </tbody>
</table>
<button on:click={handleAdd}>Add</button>