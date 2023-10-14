<template>
    <div>
        <h1>Contact</h1>
        <button @click="handleBack">Back</button>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="contact in contacts" :key="contact.id">
                    <td>{{ contact.id }}</td>
                    <td>{{ contact.name }}</td>
                    <td>{{ contact.email }}</td>
                    <td>{{ contact.mobile }}</td>
                    <td>{{ contact.status }}</td>
                    <td class="table-options">
                        <button @click="handleEdit(contact)">Edit</button>
                        <button @click="handleDelete(contact)">Delete</button>
                        <button @click="handleOpen(contact)">Open</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button @click="handleAdd">Add</button>
    </div>
</template>

<script>
import { useCompaniesStore } from '@/stores/companies';
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';

export default {
    name: "ContactTable",
    setup() {
        const router = useRouter();
        const route = useRoute();
        const companyId = route.params.companyId;
        const store = useCompaniesStore();
        onMounted(() => {
            store.setActiveCompany(companyId);
            store.fetchContacts();
        });

        const handleOpen = (contact) => {
            router.push({ name:'interaction', params: { 
                    companyId: companyId,
                    contactId: contact.id 
                } 
            });
        };
    
        const handleAdd = () => {
            const contact = {
                id: false,
                name: '',
                email: '',
                mobile: '',
                status: '',
                interactions: []
            };
            store.setAddEditPopupInfo({ 
                type: 'contact', 
                initialData: contact,
                pageBack: '/company/' + companyId
            });
            router.push({ name:'add-contact' });
        };
    
        const handleEdit = (contact) => {
            store.setAddEditPopupInfo({ 
                type: 'contact', 
                initialData:  contact,
                pageBack: '/company/' + companyId
            });
            router.push({ name:'edit-contact' });
        };
    
        const handleDelete = async (contact) => {
            store.deleteContact(contact.id);
        };

        const handleBack = () => {
            router.push({ name:'company' });
        };
    
        // Use computed to get a reactive reference to companies
        const contacts = computed(() => store.contacts);
    
        return {
            contacts,
            handleBack,
            handleAdd,
            handleEdit,
            handleDelete,
            handleOpen
        };
    }
};
</script>