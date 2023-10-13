<!-- src/routes/add-company/+page.svelte -->
<script>
    import { goto } from '$app/navigation';
    import { sharedData } from '$lib/store.js';
    import { addCompany, editCompany, addContact, editContact, addInteraction, editInteraction } from '$lib/apiService.js';
    let formData = $sharedData.initialData;
    let { formFormatter, companyId, contactId, type } = $sharedData;

    function handlerChange(event) {
        formData[event.target.name] = event.target.value;
    }

    function handlerSubmit() {
        if (formData.id) {
            if (type === 'company') {
                editCompany(formData.id, formData);
            }
            else if (type === 'contact') {
                editContact(companyId, formData.id, formData);
            }
            else if (type === 'interaction') {
                editInteraction(companyId, contactId, formData.id, formData);
            }
        }
        else {
            if (type === 'company') {
                addCompany(formData);
            }
            else if (type === 'contact') {
                addContact(companyId, formData);
            }
            else if (type === 'interaction') {
                addInteraction(companyId, contactId, formData);
            }
        }

        goto($sharedData.pageBack, {replaceState: true});
    }
</script>

<div class="overlay">
    <div class="popup">
        <div>
        {#each Object.entries(formFormatter) as [property,value]}
            <div class="popup-item">
                <div>{value.name}</div>
                <input on:input={handlerChange} name={property} type={value.type} value={formData[property]}>
            </div>
        {/each}
        </div>
        <div>
            <button on:click={handlerSubmit}>Submit</button>
        </div>
    </div>
</div>